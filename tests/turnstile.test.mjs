import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src-worker.js';
import {verifyTurnstile,renderTurnstile} from '../turnstile.mjs';

const env={TURNSTILE_REQUIRED:'true',TURNSTILE_SITE_KEY:'synthetic-site-key',TURNSTILE_SECRET_KEY:'synthetic-secret',TURNSTILE_HOSTNAME:'community.example'};
const request=new Request('https://community.example/api/interest');
const token={'cf-turnstile-response':'synthetic-token'};
const ok=()=>Response.json({success:true,hostname:env.TURNSTILE_HOSTNAME,action:'interest'});

test('disabled integration preserves existing behavior without calling a provider',async()=>{
  assert.equal(await verifyTurnstile(request,{},token,'interest',()=>{throw Error('should not call')}),null);
});
test('required integration fails closed for absent configuration',async()=>{
  assert.equal((await verifyTurnstile(request,{TURNSTILE_REQUIRED:'true'},token,'interest')).status,503);
});
test('missing and oversized tokens never reach Siteverify',async()=>{
  for(const body of [{},{'cf-turnstile-response':'a'.repeat(2049)}]){
    assert.equal((await verifyTurnstile(request,env,body,'interest',()=>{throw Error('should not call')})).status,400);
  }
});
test('only the token and secret leave the application',async()=>{
  const response=await verifyTurnstile(request,env,{...token,email:'synthetic@example.test'},'interest',async(url,init)=>{
    assert.equal(url,'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.deepEqual(Object.keys(JSON.parse(init.body)).sort(),['response','secret']);
    assert.ok(init.signal instanceof AbortSignal);
    return ok();
  });
  assert.equal(response,null);
});
test('expired, wrong-host, and wrong-action results are rejected',async()=>{
  for(const result of [{success:false,'error-codes':['timeout-or-duplicate']},{success:true,hostname:'attacker.example',action:'interest'},{success:true,hostname:env.TURNSTILE_HOSTNAME,action:'privacy_request'}])
    assert.equal((await verifyTurnstile(request,env,token,'interest',async()=>Response.json(result))).status,400);
});
test('provider errors, invalid JSON, and network failure stay unavailable',async()=>{
  for(const fn of [async()=>new Response('',{status:503}),async()=>new Response('not JSON'),async()=>{throw Error('synthetic-secret')}]){
    const result=await verifyTurnstile(request,env,token,'interest',fn);
    assert.equal(result.status,503);
    assert.equal((await result.text()).includes('synthetic-secret'),false);
  }
});
test('interest and privacy routes reject unverified requests before storage',async()=>{
  let writes=0;
  const DB={prepare(){writes++;throw Error('storage must not run');}};
  for(const path of ['/api/interest','/api/privacy-request']){
    const body=path.includes('privacy')?{email:'synthetic@example.test',type:'access'}:{name:'Synthetic Person',email:'synthetic@example.test',interests:'Testing',level:'Just getting started',consent:true};
    const response=await worker.fetch(new Request('https://community.example'+path,{method:'POST',headers:{'content-type':'application/json',origin:'https://community.example'},body:JSON.stringify(body)}),{...env,DB});
    assert.equal(response.status,400);
  }
  assert.equal(writes,0);
});
test('both HTML forms render an action-specific widget with narrow CSP',async()=>{
  for(const [path,action] of [['/','interest'],['/privacy','privacy_request']]){
    const response=await worker.fetch(new Request('https://community.example'+path),env);
    const html=await response.text();
    assert.ok(html.includes(`data-action="${action}"`));
    assert.ok(html.includes('https://challenges.cloudflare.com/turnstile/v0/api.js'));
    assert.ok(response.headers.get('content-security-policy').includes('frame-src https://challenges.cloudflare.com'));
    assert.equal(html.includes('synthetic-secret'),false);
  }
});
test('invalid sitekey is never injected into HTML',()=>{
  const html=renderTurnstile('<form></form></html>',{...env,TURNSTILE_SITE_KEY:'"><script>alert(1)</script>'},'interest');
  assert.equal(html.includes('alert(1)'),false);
  assert.ok(html.includes('temporarily unavailable'));
});

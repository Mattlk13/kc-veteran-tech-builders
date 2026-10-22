import test from 'node:test';
import assert from 'node:assert/strict';
import {readBoundedJSON} from '../bounded-json.mjs';
import worker from '../src-worker.js';
const encode = text => new TextEncoder().encode(text);
function request(path, text, headers = {}) {
  return new Request('https://community.example'+path, {method:'POST',headers:{'content-type':'application/json',...headers},body:text});
}

test('valid JSON including multibyte text and the exact byte limit is accepted', async () => {
  const text=JSON.stringify({text:'🌍 café'});
  assert.deepEqual(await readBoundedJSON(request('/',text),encode(text).length),{text:'🌍 café'});
  await assert.rejects(readBoundedJSON(request('/',text),encode(text).length-1),{status:413});
});

test('actual bytes are bounded without Content-Length and with an understated header', async () => {
  for(const headers of [{},{'content-length':'1'}]) {
    await assert.rejects(readBoundedJSON(request('/',JSON.stringify({x:'a'.repeat(6000)}),headers)),{status:413});
  }
});

test('oversized streaming bodies are cancelled and their readers released', async () => {
  let cancelled=false;
  const body=new ReadableStream({start(c){c.enqueue(encode('x'.repeat(4000)));c.enqueue(encode('x'.repeat(3000)));},cancel(){cancelled=true;}});
  const req=new Request('https://community.example/',{method:'POST',headers:{'content-type':'application/json'},body,duplex:'half'});
  await assert.rejects(readBoundedJSON(req),{status:413});
  assert.equal(cancelled,true);assert.equal(body.locked,false);
});

test('declared oversized requests are rejected without reading body chunks', async () => {
  let reads=0,cancelled=false;
  const body=new ReadableStream({pull(){reads++;},cancel(){cancelled=true;}},{highWaterMark:0});
  const req=new Request('https://community.example/',{method:'POST',headers:{'content-type':'application/json','content-length':'6001'},body,duplex:'half'});
  await assert.rejects(readBoundedJSON(req),{status:413});assert.equal(reads,0);assert.equal(cancelled,true);
});

test('malformed JSON, invalid UTF-8 and misleading content types fail', async () => {
  await assert.rejects(readBoundedJSON(request('/','{')), {status:400});
  await assert.rejects(readBoundedJSON(request('/',Uint8Array.of(0xff))), {status:400});
  await assert.rejects(readBoundedJSON(request('/','{}',{'content-type':'text/plain; application/json'})), {status:415});
  assert.deepEqual(await readBoundedJSON(request('/','{}',{'content-type':'application/json; charset=utf-8'})),{});
});

for(const path of ['/api/interest','/api/privacy-request']) {
  test(`${path} rejects oversized input before provider calls or database access`, async t => {
    let dbCalls=0,providerCalls=0;
    t.mock.method(globalThis,'fetch',async()=>{providerCalls++;throw Error('No network expected');});
    const env={TURNSTILE_REQUIRED:'true',DB:{prepare(){dbCalls++;throw Error('No database expected');}}};
    const response=await worker.fetch(request(path,JSON.stringify({padding:'x'.repeat(6000)})),env);
    assert.equal(response.status,413);assert.equal(response.headers.get('cache-control'),'no-store');
    assert.equal(dbCalls,0);assert.equal(providerCalls,0);
  });
  test(`${path} still accepts valid form submissions with disabled Turnstile`, async () => {
    let writes=0;
    const DB={prepare(){return {bind(){return this;},async first(){return {n:0};},async run(){writes++;return {success:true};}};}};
    const form=path.includes('privacy')?{email:'synthetic@example.test',type:'access'}:{name:'Synthetic Test',email:'synthetic@example.test',interests:'Testing',level:'Just getting started',consent:true};
    const response=await worker.fetch(request(path,JSON.stringify(form)),{DB});
    assert.equal(response.status,201);assert.equal(writes,1);
  });
}

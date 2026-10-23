import test from 'node:test';
import assert from 'node:assert/strict';
import worker,{renderLearning} from './worker.mjs';
import {labs} from './labs.mjs';
test('six original labs have accessible headings, navigation and no scripts',()=>{const html=renderLearning();assert.equal(labs.length,6);for(const l of labs){assert.ok(html.includes(`id="title-${l.id}"`));assert.ok(html.includes(`href="#${l.id}"`));assert.equal(l.steps.length,4)}assert.ok(!html.includes('<script'));assert.ok(html.includes('not claims that our projects are certified'));});
test('read-only routes and restrictive CSP',async()=>{for(const method of ['GET','HEAD','POST']){const r=await worker.fetch(new Request('https://learning.invalid/',{method}));assert.equal(r.status,method==='POST'?405:200);assert.ok(r.headers.get('content-security-policy').includes("default-src 'none'"));if(method==='HEAD')assert.equal(await r.text(),'')}assert.equal((await worker.fetch(new Request('https://learning.invalid/private'))).status,404)});

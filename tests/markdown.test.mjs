import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src-worker.js';
test('public Markdown has no dependency on removed token-count headers or database',async()=>{
 const response=await worker.fetch(new Request('https://community.example/about.md'),{DB:{prepare(){throw Error('must not access records');}}});
 assert.equal(response.status,200);assert.equal(response.headers.get('content-type'),'text/markdown; charset=utf-8');
 assert.equal(response.headers.has('x-markdown-tokens'),false);assert.equal(response.headers.has('x-original-tokens'),false);
 assert.match(await response.text(),/^# KC Veteran Tech Builders/);
});
test('Markdown does not replace the normal homepage',async()=>{
 const response=await worker.fetch(new Request('https://community.example/'),{});
 assert.match(response.headers.get('content-type'),/text\/html/);
});

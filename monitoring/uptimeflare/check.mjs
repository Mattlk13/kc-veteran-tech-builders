import { workerConfig } from './profile.mjs';

// Read-only smoke check. No signup requests, cookies, secrets or notifications.
let failed = false;
for (const monitor of workerConfig.monitors) {
  let result;
  try {
    const response = await fetch(monitor.target, {
      method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(monitor.timeout)
    });
    const reader = response.body?.getReader();
    const chunks = []; let size = 0;
    if (reader) {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > 512 * 1024) { await reader.cancel(); throw new Error('Response exceeds smoke-check limit'); }
          chunks.push(value);
        }
      } finally { reader.releaseLock(); }
    }
    const text = Buffer.concat(chunks).toString('utf8');
    result = { id: monitor.id, status: response.status, keywordMatched: text.includes(monitor.responseKeyword) };
    result.passed = monitor.expectedCodes.includes(response.status) && result.keywordMatched;
  } catch {
    result = { id: monitor.id, passed: false, error: 'Request failed, timed out, or exceeded response limit' };
  }
  if (!result.passed) failed = true;
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), ...result }));
}
process.exitCode = failed ? 1 : 0;

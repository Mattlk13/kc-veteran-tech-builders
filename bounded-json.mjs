export class RequestBodyError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

export async function readBoundedJSON(request, maxBytes = 6000) {
  const type = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (type !== 'application/json') throw new RequestBodyError('JSON required', 415);
  if (!Number.isSafeInteger(maxBytes) || maxBytes < 1) throw new Error('Invalid body limit');
  const reader = request.body?.getReader();
  if (!reader) throw new RequestBodyError('Invalid JSON', 400);
  let complete = false;
  try {
    const declared = request.headers.get('content-length');
    if (declared !== null && (!/^\d+$/.test(declared) || !Number.isSafeInteger(Number(declared)))) {
      throw new RequestBodyError('Invalid Content-Length', 400);
    }
    if (declared !== null && Number(declared) > maxBytes) throw new RequestBodyError('Request too large', 413);
    const chunks = []; let size = 0;
    for (;;) {
      const {done, value} = await reader.read();
      if (done) { complete = true; break; }
      if (value.byteLength === 0) continue;
      size += value.byteLength;
      if (size > maxBytes) throw new RequestBodyError('Request too large', 413);
      chunks.push(value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    try { return JSON.parse(new TextDecoder('utf-8', {fatal:true}).decode(bytes)); }
    catch { throw new RequestBodyError('Invalid JSON', 400); }
  } finally {
    try { if (!complete) await reader.cancel(); } catch { /* Keep original error. */ }
    reader.releaseLock();
  }
}

export function bodyErrorResponse(error) {
  return Response.json({error:error instanceof RequestBodyError ? error.message : 'Invalid request'}, {
    status:error instanceof RequestBodyError ? error.status : 400,
    headers:{'cache-control':'no-store'}
  });
}

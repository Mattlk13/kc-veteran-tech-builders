const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export function turnstileConfig(env = {}) {
  const required = env.TURNSTILE_REQUIRED === 'true';
  const sitekey = String(env.TURNSTILE_SITE_KEY || '');
  const hostname = String(env.TURNSTILE_HOSTNAME || '').toLowerCase();
  return { required, sitekey, hostname, ready: required &&
    /^[A-Za-z0-9_-]{1,100}$/.test(sitekey) &&
    /^[a-z0-9.-]+$/.test(hostname) && Boolean(env.TURNSTILE_SECRET_KEY) };
}

export async function verifyTurnstile(request, env, body, action, fetchImpl = fetch) {
  const config = turnstileConfig(env);
  if (!config.required) return null;
  const reject = (status, error) => Response.json({error}, {status, headers:{'cache-control':'no-store'}});
  if (!config.ready || new URL(request.url).hostname !== config.hostname)
    return reject(503, 'Verification is temporarily unavailable. Please try again later.');
  const token = body?.['cf-turnstile-response'];
  if (typeof token !== 'string' || !token.trim() || token.length > 2048)
    return reject(400, 'Please complete the verification and try again.');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    // Do not send applicant fields or the connection IP to the verification service.
    const result = await fetchImpl(VERIFY_URL, {
      method:'POST', signal:controller.signal,
      headers:{'content-type':'application/json'},
      body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY, response:token})
    });
    if (!result.ok) return reject(503, 'Verification is temporarily unavailable. Please try again later.');
    const data = await result.json();
    if (data.success !== true || data.hostname !== config.hostname || data.action !== action)
      return reject(400, 'Verification expired or failed. Please complete it again.');
    return null;
  } catch {
    return reject(503, 'Verification is temporarily unavailable. Please try again later.');
  } finally { clearTimeout(timer); }
}

export function renderTurnstile(html, env, action) {
  const config = turnstileConfig(env);
  if (!config.required) return html;
  if (!config.ready) return html.replace('</form>', '<p role="alert">Verification is temporarily unavailable. Please try again later.</p></form>');
  const widget = `<div class="cf-turnstile" data-sitekey="${config.sitekey}" data-action="${action}"></div>`;
  return html.replace('</form>', widget+'</form>')
    .replace('</html>', '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script></html>');
}

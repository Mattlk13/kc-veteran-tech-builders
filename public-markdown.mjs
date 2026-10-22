// Explicit public content endpoint; no dynamic applicant or administrator data.
export function publicMarkdown() {
  return new Response(`# KC Veteran Tech Builders

A Kansas City community of veterans and civilian allies learning and building technology together.

- [Community interest form](/)
- [Privacy and data requests](/privacy)

Participation is voluntary. Do not submit passwords, government identification numbers, or medical information.
`, {headers:{'content-type':'text/markdown; charset=utf-8','cache-control':'public, max-age=300','x-content-type-options':'nosniff'}});
}

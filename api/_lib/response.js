export function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export async function parseBody(req) {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  try {
    return body ? JSON.parse(body) : {};
  } catch {
    return {};
  }
}

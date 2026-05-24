import { demoUser } from "./_lib/data.js";
import { parseBody, sendJson } from "./_lib/response.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { message: "Method not allowed" });
  }

  const { email, password } = await parseBody(req);

  if (email === "demo@quantumtrade.dev" && password === "demo123") {
    return sendJson(res, 200, {
      token: "mock-token-quantum-trade",
      user: demoUser
    });
  }

  return sendJson(res, 401, {
    message: "Invalid demo credentials. Use demo@quantumtrade.dev / demo123."
  });
}

import { parseBody, sendJson } from "./_lib/response.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { message: "Method not allowed" });
  }

  const body = await parseBody(req);

  return sendJson(res, 201, {
    message: "Demo account created successfully.",
    user: {
      id: `usr_${Date.now()}`,
      name: body.name || "New Demo User",
      email: body.email || "new.user@quantumtrade.dev",
      role: "Demo Trader",
      plan: "Portfolio Demo",
      balance: 15000
    },
    token: "mock-token-registered-user"
  });
}

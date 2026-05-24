import { demoUser, portfolio } from "./_lib/data.js";
import { sendJson } from "./_lib/response.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { message: "Method not allowed" });
  }

  return sendJson(res, 200, {
    account: {
      balance: demoUser.balance,
      equity: 29362.15,
      exposure: 720,
      winRate: 68.4
    },
    positions: portfolio
  });
}

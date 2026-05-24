import { orders } from "./_lib/data.js";
import { parseBody, sendJson } from "./_lib/response.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return sendJson(res, 200, { orders });
  }

  if (req.method === "POST") {
    const body = await parseBody(req);

    return sendJson(res, 201, {
      message: "Simulated order placed successfully.",
      order: {
        id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
        asset: body.asset || "NAS100",
        direction: body.direction || "CALL",
        stake: Number(body.stake || 100),
        result: "Pending",
        profit: 0,
        createdAt: new Date().toLocaleString("en-US")
      }
    });
  }

  return sendJson(res, 405, { message: "Method not allowed" });
}

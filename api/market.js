import { buildSeries, randomizeAssets, randomizeMarketPairs } from "./_lib/data.js";
import { sendJson } from "./_lib/response.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { message: "Method not allowed" });
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const assetId = url.searchParams.get("asset") || "nas100";

  return sendJson(res, 200, {
    updatedAt: new Date().toISOString(),
    assets: randomizeAssets(),
    pairs: randomizeMarketPairs(),
    series: buildSeries(assetId)
  });
}

import {
  buildSeries,
  buildMarketHistory,
  marketPairs,
  randomizeAssets,
  randomizeMarketPairs
} from "./_lib/data.js";
import { sendJson } from "./_lib/response.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { message: "Method not allowed" });
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const assetId = url.searchParams.get("asset") || "nas100";
  const pairId = url.searchParams.get("pair") || "btc";
  const range = url.searchParams.get("range") || "1m";
  const pairs = randomizeMarketPairs();
  const selectedPair = pairs.find((pair) => pair.id === pairId) || pairs[2] || marketPairs[2];

  return sendJson(res, 200, {
    updatedAt: new Date().toISOString(),
    assets: randomizeAssets(),
    pairs,
    selectedPair,
    marketHistory: buildMarketHistory(pairId, range),
    series: buildSeries(assetId)
  });
}

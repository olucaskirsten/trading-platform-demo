import express from "express";
import cors from "cors";
import {
  demoUser,
  portfolio,
  orders,
  buildSeries,
  buildMarketHistory,
  marketPairs,
  randomizeAssets,
  randomizeMarketPairs
} from "../api/_lib/data.js";

const app = express();
const PORT = 5174;

app.use(cors());
app.use(express.json());

app.post("/api/auth", (req, res) => {
  const { email, password } = req.body;

  if (email === "demo@quantumtrade.dev" && password === "demo123") {
    return res.json({
      token: "mock-token-quantum-trade",
      user: demoUser
    });
  }

  return res.status(401).json({
    message: "Invalid demo credentials. Use demo@quantumtrade.dev / demo123."
  });
});

app.post("/api/register", (req, res) => {
  return res.status(201).json({
    message: "Demo account created successfully.",
    user: {
      id: `usr_${Date.now()}`,
      name: req.body.name || "New Demo User",
      email: req.body.email || "new.user@quantumtrade.dev",
      role: "Demo Trader",
      plan: "Portfolio Demo",
      balance: 15000
    },
    token: "mock-token-registered-user"
  });
});

app.get("/api/market", (req, res) => {
  const assetId = req.query.asset || "nas100";
  const pairId = req.query.pair || "btc";
  const range = req.query.range || "1m";
  const pairs = randomizeMarketPairs();
  const selectedPair = pairs.find((pair) => pair.id === pairId) || pairs[2] || marketPairs[2];

  res.json({
    updatedAt: new Date().toISOString(),
    assets: randomizeAssets(),
    pairs,
    selectedPair,
    marketHistory: buildMarketHistory(pairId, range),
    series: buildSeries(assetId)
  });
});

app.get("/api/portfolio", (req, res) => {
  res.json({
    account: {
      balance: demoUser.balance,
      equity: 29362.15,
      exposure: 720,
      winRate: 68.4
    },
    positions: portfolio
  });
});

app.get("/api/orders", (_req, res) => {
  res.json({ orders });
});

app.post("/api/orders", (req, res) => {
  res.status(201).json({
    message: "Simulated order placed successfully.",
    order: {
      id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
      asset: req.body.asset || "NAS100",
      direction: req.body.direction || "CALL",
      stake: Number(req.body.stake || 100),
      result: "Pending",
      profit: 0,
      createdAt: new Date().toLocaleString("en-US")
    }
  });
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});

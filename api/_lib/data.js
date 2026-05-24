export const demoUser = {
  id: "usr_demo_001",
  name: "Alex Morgan",
  email: "demo@quantumtrade.dev",
  role: "Demo Trader",
  plan: "Portfolio Demo",
  balance: 28450.75
};

export const assets = [
  {
    id: "nas100",
    symbol: "NAS100",
    name: "US Tech 100",
    category: "Index",
    price: 18432.65,
    change: 1.24,
    payout: 87,
    volatility: "High"
  },
  {
    id: "eurusd",
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    category: "Forex",
    price: 1.0874,
    change: -0.18,
    payout: 82,
    volatility: "Medium"
  },
  {
    id: "btcusd",
    symbol: "BTC/USD",
    name: "Bitcoin / US Dollar",
    category: "Crypto",
    price: 67240.1,
    change: 2.91,
    payout: 89,
    volatility: "Extreme"
  },
  {
    id: "xauusd",
    symbol: "XAU/USD",
    name: "Gold / US Dollar",
    category: "Commodity",
    price: 2345.92,
    change: -0.44,
    payout: 84,
    volatility: "Medium"
  }
];

export const portfolio = [
  {
    id: "pos_001",
    asset: "BTC/USD",
    direction: "CALL",
    stake: 350,
    expiry: "5 min",
    status: "Open",
    expectedReturn: 661.5
  },
  {
    id: "pos_002",
    asset: "NAS100",
    direction: "PUT",
    stake: 220,
    expiry: "3 min",
    status: "Open",
    expectedReturn: 411.4
  },
  {
    id: "pos_003",
    asset: "EUR/USD",
    direction: "CALL",
    stake: 150,
    expiry: "1 min",
    status: "Closed",
    expectedReturn: 273
  }
];

export const marketPairs = [
  {
    id: "usd",
    symbol: "USD",
    name: "US Dollar",
    value: 5.13,
    change: 0.34,
    type: "Currency",
    description: "Benchmark currency used to compare simulated global market values."
  },
  {
    id: "eur",
    symbol: "EUR",
    name: "Euro",
    value: 5.56,
    change: -0.12,
    type: "Currency",
    description: "European currency comparison with simulated BRL conversion."
  },
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    value: 345120,
    change: 2.45,
    type: "Crypto",
    description: "The largest crypto asset by market recognition in this simulated dashboard."
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    value: 18120,
    change: 1.16,
    type: "Crypto",
    description: "A major crypto network represented with simulated market movement."
  },
  {
    id: "sol",
    symbol: "SOL",
    name: "Solana",
    value: 804.3,
    change: -0.74,
    type: "Crypto",
    description: "A high-volatility crypto asset for comparison and watchlist behavior."
  },
  {
    id: "bnb",
    symbol: "BNB",
    name: "BNB",
    value: 3182.2,
    change: 0.51,
    type: "Crypto",
    description: "A large crypto ecosystem token used in this mock market overview."
  }
];

export const orders = [
  {
    id: "ORD-9401",
    asset: "BTC/USD",
    direction: "CALL",
    stake: 350,
    result: "Win",
    profit: 311.5,
    createdAt: "2026-05-23 14:08"
  },
  {
    id: "ORD-9398",
    asset: "XAU/USD",
    direction: "PUT",
    stake: 180,
    result: "Loss",
    profit: -180,
    createdAt: "2026-05-23 13:42"
  },
  {
    id: "ORD-9392",
    asset: "EUR/USD",
    direction: "CALL",
    stake: 120,
    result: "Win",
    profit: 98.4,
    createdAt: "2026-05-23 12:19"
  }
];

export function buildSeries(assetId = "nas100", points = 34) {
  const asset = assets.find((item) => item.id === assetId) || assets[0];
  const base = asset.price;
  const now = Date.now();

  return Array.from({ length: points }).map((_, index) => {
    const wave = Math.sin(index / 2.3) * (base * 0.0017);
    const noise = Math.cos(index / 1.7) * (base * 0.0009);
    const directionPulse = index % 7 === 0 ? base * 0.0012 : 0;
    const value = base + wave + noise + directionPulse + index * (base * 0.00005);

    return {
      time: new Date(now - (points - index) * 2500).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }),
      value: Number(value.toFixed(asset.price < 10 ? 5 : 2))
    };
  });
}

export function randomizeAssets() {
  return assets.map((asset, index) => {
    const drift = Math.sin(Date.now() / 9000 + index) * 0.9;
    return {
      ...asset,
      price: Number((asset.price * (1 + drift / 1000)).toFixed(asset.price < 10 ? 5 : 2)),
      change: Number((asset.change + drift / 3).toFixed(2))
    };
  });
}

export function randomizeMarketPairs() {
  return marketPairs.map((item, index) => {
    const drift = Math.cos(Date.now() / 10000 + index) * 0.5;
    return {
      ...item,
      value: Number((item.value * (1 + drift / 1000)).toFixed(item.value < 10 ? 4 : 2)),
      change: Number((item.change + drift / 5).toFixed(2))
    };
  });
}


export function buildMarketHistory(pairId = "btc", range = "1m") {
  const pair = marketPairs.find((item) => item.id === pairId) || marketPairs[2];
  const settings = {
    "1d": { points: 32, amplitude: 0.018 },
    "1w": { points: 42, amplitude: 0.028 },
    "1m": { points: 48, amplitude: 0.05 },
    "1y": { points: 60, amplitude: 0.18 }
  };

  const selected = settings[range] || settings["1m"];
  const seed = pair.id.split("").reduce((total, letter) => total + letter.charCodeAt(0), 0);
  const trendBias = pair.change >= 0 ? 1 : -1;

  return Array.from({ length: selected.points }).map((_, index) => {
    const progress = index / Math.max(selected.points - 1, 1);
    const cycle = Math.sin(index / 2.8 + seed) * selected.amplitude;
    const secondCycle = Math.cos(index / 5.1 + seed / 3) * (selected.amplitude * 0.46);
    const trend = progress * selected.amplitude * trendBias * 0.86;
    const value = pair.value * (1 + cycle + secondCycle + trend);

    let label = `D${index + 1}`;

    if (range === "1d") {
      label = `${String(index % 24).padStart(2, "0")}:00`;
    }

    if (range === "1w") {
      label = `Day ${index + 1}`;
    }

    if (range === "1y") {
      label = `M${index + 1}`;
    }

    return {
      time: label,
      value: Number(value.toFixed(pair.value < 10 ? 4 : 2))
    };
  });
}

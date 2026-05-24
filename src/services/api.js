const API_BASE_URL = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export const api = {
  login: (credentials) =>
    request("/api/auth", {
      method: "POST",
      body: JSON.stringify(credentials)
    }),

  register: (payload) =>
    request("/api/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  getMarket: (assetId = "nas100", pairId = "btc", range = "1m") =>
    request(`/api/market?asset=${assetId}&pair=${pairId}&range=${range}`),

  getPortfolio: () => request("/api/portfolio"),

  getOrders: () => request("/api/orders"),

  createOrder: (payload) =>
    request("/api/orders", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

const searchableItems = [
  {
    label: "Live Trading",
    description: "Open the real-time trading simulator",
    path: "/dashboard",
    keywords: ["dashboard", "trading", "live", "chart", "call", "put"]
  },
  {
    label: "Portfolio",
    description: "View active positions and account performance",
    path: "/portfolio",
    keywords: ["wallet", "positions", "balance", "equity"]
  },
  {
    label: "Markets",
    description: "Compare currencies and crypto assets",
    path: "/markets?pair=btc&range=1m",
    keywords: ["usd", "eur", "bitcoin", "ethereum", "crypto", "currency"]
  },
  {
    label: "Orders",
    description: "Review simulated trade history",
    path: "/orders",
    keywords: ["history", "trades", "orders"]
  },
  {
    label: "Watchlist",
    description: "Monitor favorite assets",
    path: "/watchlist",
    keywords: ["favorites", "assets", "alerts"]
  },
  {
    label: "Insights",
    description: "Read simulated market intelligence",
    path: "/insights",
    keywords: ["signals", "momentum", "analysis"]
  },
  {
    label: "Account",
    description: "Edit profile, photo and banking details",
    path: "/account",
    keywords: ["profile", "client", "bank", "photo", "account"]
  },
  {
    label: "Risk Settings",
    description: "Adjust simulated account controls",
    path: "/risk-settings",
    keywords: ["settings", "risk", "limits", "profile"]
  },
  {
    label: "US Dollar",
    description: "Open the USD market detail chart",
    path: "/markets?pair=usd&range=1m",
    keywords: ["usd", "dollar", "currency", "forex"]
  },
  {
    label: "Euro",
    description: "Open the EUR market detail chart",
    path: "/markets?pair=eur&range=1m",
    keywords: ["eur", "euro", "currency", "forex"]
  },
  {
    label: "Bitcoin",
    description: "Open the BTC market detail chart",
    path: "/markets?pair=btc&range=1m",
    keywords: ["btc", "bitcoin", "crypto", "btcusd"]
  },
  {
    label: "Ethereum",
    description: "Open the ETH market detail chart",
    path: "/markets?pair=eth&range=1m",
    keywords: ["eth", "ethereum", "crypto"]
  },
  {
    label: "Solana",
    description: "Open the SOL market detail chart",
    path: "/markets?pair=sol&range=1m",
    keywords: ["sol", "solana", "crypto"]
  },
  {
    label: "BNB",
    description: "Open the BNB market detail chart",
    path: "/markets?pair=bnb&range=1m",
    keywords: ["bnb", "binance", "crypto"]
  },
  {
    label: "NAS100",
    description: "US Tech 100 simulated trading asset",
    path: "/dashboard",
    keywords: ["nasdaq", "tech", "index", "nas100"]
  },
  {
    label: "EUR/USD",
    description: "Euro and US Dollar simulated forex pair",
    path: "/dashboard",
    keywords: ["eurusd", "euro dollar", "forex"]
  },
  {
    label: "BTC/USD",
    description: "Bitcoin and US Dollar simulated trading asset",
    path: "/dashboard",
    keywords: ["btcusd", "bitcoin dollar", "crypto"]
  },
  {
    label: "XAU/USD",
    description: "Gold and US Dollar simulated commodity pair",
    path: "/dashboard",
    keywords: ["gold", "xauusd", "commodity"]
  }
];

export default function Topbar() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    return searchableItems
      .filter((item) => {
        const searchableText = [item.label, item.description, ...item.keywords]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 7);
  }, [search]);

  return (
    <motion.header
      className="topbar"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36 }}
    >
      <motion.div
        className="search-box search-wrapper"
        whileFocusWithin={{ scale: 1.015, borderColor: "rgba(139, 92, 246, 0.58)" }}
      >
        <Search size={18} />

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search assets, orders or markets..."
        />

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              className="search-results"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
            >
              {results.map((item) => (
                <Link
                  key={`${item.label}-${item.path}`}
                  to={item.path}
                  onClick={() => setSearch("")}
                >
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="topbar-user">
        <div>
          <strong>{user?.name}</strong>
          <span>{user?.role}</span>
        </div>
        <motion.button
          className="icon-button"
          onClick={logout}
          aria-label="Log out"
          whileHover={{ y: -2, rotate: 3 }}
          whileTap={{ scale: 0.92 }}
        >
          <LogOut size={18} />
        </motion.button>
      </div>
    </motion.header>
  );
}

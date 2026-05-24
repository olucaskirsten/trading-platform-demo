import "./Watchlist.css";
import { useEffect, useState } from "react";
import { Bell, Star } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedPage from "../../components/AnimatedPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import { api } from "../../services/api.js";
import { formatPercent } from "../../utils/formatters.js";

export default function Watchlist() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    api.getMarket().then((data) => setAssets(data.assets));
  }, []);

  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Watchlist"
        title="Favorite trading instruments"
        description="A focused page for monitoring assets that deserve quick attention during the simulated session."
      />

      <div className="watchlist">
        {assets.map((asset, index) => (
          <motion.article
            key={asset.id}
            className="watch-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ y: -4, scale: 1.006 }}
          >
            <motion.div
              className="watch-icon"
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
            >
              <Star size={18} />
            </motion.div>
            <div>
              <h2>{asset.symbol}</h2>
              <p>{asset.name}</p>
              <span>{asset.category} · {asset.volatility} volatility</span>
            </div>
            <strong className={asset.change >= 0 ? "positive" : "negative"}>
              {formatPercent(asset.change)}
            </strong>
            <motion.button className="secondary-button" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Bell size={16} />
              Alert
            </motion.button>
          </motion.article>
        ))}
      </div>
    </AnimatedPage>
  );
}

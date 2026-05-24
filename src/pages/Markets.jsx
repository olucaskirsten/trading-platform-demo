import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedGrid from "../components/AnimatedGrid.jsx";
import AnimatedPage from "../components/AnimatedPage.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { api } from "../services/api.js";
import { cardReveal, softPop } from "../utils/animations.js";
import { formatCurrency, formatPercent } from "../utils/formatters.js";

export default function Markets() {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    api.getMarket().then((data) => setPairs(data.pairs));
  }, []);

  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Currency & crypto comparison"
        title="Global market snapshot"
        description="Compare simulated values for USD, EUR and leading crypto assets in a clean portfolio dashboard view."
      />

      <AnimatedGrid className="market-grid">
        {pairs.map((pair) => (
          <motion.article key={pair.id} className="market-card" variants={cardReveal} {...softPop}>
            <div>
              <span>{pair.type}</span>
              <h2>{pair.symbol}</h2>
              <p>{pair.name}</p>
            </div>
            <motion.strong
              key={pair.value}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {formatCurrency(pair.value, "BRL")}
            </motion.strong>
            <small className={pair.change >= 0 ? "positive" : "negative"}>
              {formatPercent(pair.change)}
            </small>
          </motion.article>
        ))}
      </AnimatedGrid>
    </AnimatedPage>
  );
}

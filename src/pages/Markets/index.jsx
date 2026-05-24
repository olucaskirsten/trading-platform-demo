import "./Markets.css";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedGrid from "../../components/AnimatedGrid.jsx";
import AnimatedPage from "../../components/AnimatedPage.jsx";
import MarketDetailChart from "../../components/MarketDetailChart.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import { api } from "../../services/api.js";
import { cardReveal, softPop } from "../../utils/animations.js";
import { formatCurrency, formatPercent } from "../../utils/formatters.js";

export default function Markets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPair = searchParams.get("pair") || "btc";
  const initialRange = searchParams.get("range") || "1m";

  const [selectedPair, setSelectedPair] = useState(initialPair);
  const [range, setRange] = useState(initialRange);
  const [market, setMarket] = useState({
    pairs: [],
    selectedPair: null,
    marketHistory: []
  });

  useEffect(() => {
    api.getMarket("nas100", selectedPair, range).then((data) => {
      setMarket(data);
      setSearchParams({ pair: selectedPair, range });
    });
  }, [selectedPair, range, setSearchParams]);

  const selectedPairData = useMemo(
    () => market.selectedPair || market.pairs.find((pair) => pair.id === selectedPair),
    [market.selectedPair, market.pairs, selectedPair]
  );

  function handleSelectPair(pairId) {
    setSelectedPair(pairId);

    requestAnimationFrame(() => {
      document.getElementById("market-detail-panel")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Currency & crypto comparison"
        title="Global market snapshot"
        description="Compare simulated values for USD, EUR and leading crypto assets. Click any card to open its dedicated chart panel."
      />

      <AnimatedGrid className="market-grid">
        {market.pairs.map((pair) => (
          <motion.button
            type="button"
            key={pair.id}
            className={`market-card market-card-button ${selectedPair === pair.id ? "selected" : ""}`}
            variants={cardReveal}
            onClick={() => handleSelectPair(pair.id)}
            {...softPop}
          >
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
          </motion.button>
        ))}
      </AnimatedGrid>

      <div id="market-detail-panel">
        <MarketDetailChart
          pair={selectedPairData}
          history={market.marketHistory}
          range={range}
          onRangeChange={setRange}
        />
      </div>
    </AnimatedPage>
  );
}

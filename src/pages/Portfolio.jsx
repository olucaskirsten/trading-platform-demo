import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedGrid from "../components/AnimatedGrid.jsx";
import AnimatedPage from "../components/AnimatedPage.jsx";
import MetricCard from "../components/MetricCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { api } from "../services/api.js";
import { formatCurrency } from "../utils/formatters.js";

export default function Portfolio() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getPortfolio().then(setData);
  }, []);

  if (!data) {
    return <div className="loading-card">Loading portfolio...</div>;
  }

  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Portfolio"
        title="Active positions and account performance"
        description="A simulated overview of account equity, exposure and open binary options positions."
      />

      <AnimatedGrid className="metric-grid">
        <MetricCard label="Balance" value={formatCurrency(data.account.balance)} hint="Available funds" />
        <MetricCard label="Equity" value={formatCurrency(data.account.equity)} hint="+3.2% today" trend="positive" />
        <MetricCard label="Exposure" value={formatCurrency(data.account.exposure)} hint="Open risk" />
        <MetricCard label="Win rate" value={`${data.account.winRate}%`} hint="Last 30 trades" trend="positive" />
      </AnimatedGrid>

      <motion.div
        className="table-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
      >
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Direction</th>
              <th>Stake</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Expected return</th>
            </tr>
          </thead>
          <tbody>
            {data.positions.map((position) => (
              <motion.tr
                key={position.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.08)" }}
              >
                <td>{position.asset}</td>
                <td>
                  <span className={position.direction === "CALL" ? "tag positive" : "tag negative"}>
                    {position.direction}
                  </span>
                </td>
                <td>{formatCurrency(position.stake)}</td>
                <td>{position.expiry}</td>
                <td>{position.status}</td>
                <td>{formatCurrency(position.expectedReturn)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </AnimatedPage>
  );
}

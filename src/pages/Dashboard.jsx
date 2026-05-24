import { useState } from "react";
import AnimatedGrid from "../components/AnimatedGrid.jsx";
import AnimatedPage from "../components/AnimatedPage.jsx";
import AssetSelector from "../components/AssetSelector.jsx";
import LiveChart from "../components/LiveChart.jsx";
import MetricCard from "../components/MetricCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import TradeTicket from "../components/TradeTicket.jsx";
import { useLiveMarket } from "../hooks/useLiveMarket.js";
import { formatCurrency } from "../utils/formatters.js";

export default function Dashboard() {
  const [selectedAsset, setSelectedAsset] = useState("nas100");
  const { assets, series, direction, selectedAssetData, loading } = useLiveMarket(selectedAsset);

  if (loading) {
    return <div className="loading-card">Loading live market simulator...</div>;
  }

  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Live trading simulator"
        title="Real-time asset movement dashboard"
        description="Monitor simulated price action, select an asset and place mock Call/Put orders from a polished trading interface."
      />

      <AnimatedGrid className="metric-grid">
        <MetricCard label="Demo balance" value={formatCurrency(28450.75)} hint="+8.4% this week" trend="positive" />
        <MetricCard label="Open exposure" value={formatCurrency(720)} hint="3 active positions" />
        <MetricCard label="Avg. payout" value="85.5%" hint="Across selected markets" trend="positive" />
        <MetricCard label="Latency" value="2.5s" hint="Mock refresh interval" />
      </AnimatedGrid>

      <AssetSelector assets={assets} selectedAsset={selectedAsset} onSelect={setSelectedAsset} />

      <div className="dashboard-grid">
        <LiveChart data={series} direction={direction} />
        <TradeTicket asset={selectedAssetData} />
      </div>
    </AnimatedPage>
  );
}

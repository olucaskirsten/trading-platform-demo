import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatCurrency, formatPercent } from "../utils/formatters.js";

const ranges = [
  { label: "1D", value: "1d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "1Y", value: "1y" }
];

export default function MarketDetailChart({ pair, history, range, onRangeChange }) {
  if (!pair) return null;

  const direction = pair.change >= 0 ? "up" : "down";
  const stroke = direction === "up" ? "#28f5a1" : "#ff4f6d";
  const gradientId = direction === "up" ? "marketGreenMove" : "marketRedMove";

  return (
    <motion.section
      className="market-detail-panel"
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42 }}
      layout
    >
      <div className="market-detail-header">
        <div>
          <span>{pair.type} detail panel</span>
          <h2>{pair.name}</h2>
          <p>{pair.description}</p>
        </div>

        <div className="market-price-box">
          <strong>{formatCurrency(pair.value, "BRL")}</strong>
          <small className={pair.change >= 0 ? "positive" : "negative"}>
            {formatPercent(pair.change)}
          </small>
        </div>
      </div>

      <div className="range-tabs">
        {ranges.map((item) => (
          <motion.button
            key={item.value}
            className={range === item.value ? "active" : ""}
            onClick={() => onRangeChange(item.value)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            {item.label}
          </motion.button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={history}>
          <defs>
            <linearGradient id="marketGreenMove" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#28f5a1" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#28f5a1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="marketRedMove" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4f6d" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#ff4f6d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
          <XAxis dataKey="time" stroke="rgba(255,255,255,.45)" tick={{ fontSize: 11 }} />
          <YAxis stroke="rgba(255,255,255,.45)" tick={{ fontSize: 11 }} domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value) => [formatCurrency(value, "BRL"), pair.symbol]}
            contentStyle={{
              background: "#11131f",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: "14px",
              color: "#fff"
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={3}
            fill={`url(#${gradientId})`}
            dot={false}
            isAnimationActive
            animationDuration={720}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.section>
  );
}

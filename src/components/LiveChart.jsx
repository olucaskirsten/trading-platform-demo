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

export default function LiveChart({ data, direction }) {
  const stroke = direction === "up" ? "#28f5a1" : "#ff4f6d";
  const gradientId = direction === "up" ? "greenMove" : "redMove";

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.004 }}
    >
      <div className="chart-topline">
        <div>
          <span>Live signal</span>
          <strong>{direction === "up" ? "Bullish movement" : "Bearish movement"}</strong>
        </div>
        <motion.div
          className={`pulse ${direction}`}
          key={direction}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {direction === "up" ? "UP" : "DOWN"}
        </motion.div>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="greenMove" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#28f5a1" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#28f5a1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="redMove" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4f6d" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#ff4f6d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" />
          <XAxis dataKey="time" stroke="rgba(255,255,255,.45)" tick={{ fontSize: 11 }} />
          <YAxis stroke="rgba(255,255,255,.45)" tick={{ fontSize: 11 }} domain={["auto", "auto"]} />
          <Tooltip
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
            animationDuration={650}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

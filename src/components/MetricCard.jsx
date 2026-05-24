import { motion } from "framer-motion";
import { cardReveal, softPop } from "../utils/animations.js";

export default function MetricCard({ label, value, hint, trend = "neutral" }) {
  return (
    <motion.article className="metric-card" variants={cardReveal} {...softPop}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={trend}>{hint}</small>
    </motion.article>
  );
}

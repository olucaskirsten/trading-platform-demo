import "./Insights.css";
import { Brain, Gauge, RadioTower } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedGrid from "../../components/AnimatedGrid.jsx";
import AnimatedPage from "../../components/AnimatedPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import { cardReveal, softPop } from "../../utils/animations.js";

const insights = [
  {
    icon: Brain,
    title: "Momentum bias",
    description: "BTC/USD and NAS100 are showing stronger simulated momentum in the current demo session."
  },
  {
    icon: Gauge,
    title: "Volatility warning",
    description: "Crypto pairs should be treated as high-risk instruments because movement can change quickly."
  },
  {
    icon: RadioTower,
    title: "Signal freshness",
    description: "Market cards and chart series refresh every few seconds to mimic a live monitoring workflow."
  }
];

export default function Insights() {
  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Market intelligence"
        title="Simulated signal insights"
        description="This extra portfolio page adds depth by showing how the product could communicate signals, warnings and market context."
      />

      <AnimatedGrid className="insights-grid">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <motion.article key={item.title} className="insight-card" variants={cardReveal} {...softPop}>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Icon size={24} />
              </motion.div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </motion.article>
          );
        })}
      </AnimatedGrid>

      <motion.section
        className="disclaimer-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
      >
        <strong>Portfolio disclaimer</strong>
        <p>
          These insights are simulated and exist only to demonstrate interface design,
          data presentation and product thinking. They are not investment recommendations.
        </p>
      </motion.section>
    </AnimatedPage>
  );
}

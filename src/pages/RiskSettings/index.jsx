import "./RiskSettings.css";
import { motion } from "framer-motion";
import AnimatedPage from "../../components/AnimatedPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";

export default function RiskSettings() {
  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Risk profile"
        title="Demo account controls"
        description="A settings-style page showing how the platform could handle limits, profile preferences and safer product behavior."
      />

      <div className="settings-grid">
        <motion.section
          className="settings-card"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -4 }}
        >
          <h2>Trading limits</h2>
          <label>
            Max stake per order
            <input defaultValue="$500" />
          </label>
          <label>
            Daily simulated loss limit
            <input defaultValue="$1,500" />
          </label>
          <label>
            Default expiry
            <select defaultValue="3 min">
              <option>1 min</option>
              <option>3 min</option>
              <option>5 min</option>
              <option>15 min</option>
            </select>
          </label>
        </motion.section>

        <motion.section
          className="settings-card"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -4 }}
        >
          <h2>Interface preferences</h2>
          <label className="toggle-row">
            <span>Show volatility warnings</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="toggle-row">
            <span>Enable live chart animation</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="toggle-row">
            <span>Display demo disclaimer</span>
            <input type="checkbox" defaultChecked />
          </label>
        </motion.section>
      </div>
    </AnimatedPage>
  );
}

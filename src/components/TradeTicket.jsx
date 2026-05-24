import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../services/api.js";
import { buttonMotion } from "../utils/animations.js";

export default function TradeTicket({ asset }) {
  const [stake, setStake] = useState(100);
  const [expiry, setExpiry] = useState("1 min");
  const [message, setMessage] = useState("");

  async function placeOrder(direction) {
    const response = await api.createOrder({
      asset: asset?.symbol,
      direction,
      stake,
      expiry
    });

    setMessage(`${response.order.direction} order created: ${response.order.id}`);
  }

  return (
    <motion.aside
      className="trade-ticket"
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.42 }}
    >
      <span>Order ticket</span>
      <motion.h2 key={asset?.symbol} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        {asset?.symbol || "Select asset"}
      </motion.h2>
      <p>{asset?.name || "Choose a market to start the simulation."}</p>

      <label>
        Stake amount
        <input
          type="number"
          min="10"
          value={stake}
          onChange={(event) => setStake(event.target.value)}
        />
      </label>

      <label>
        Expiry time
        <select value={expiry} onChange={(event) => setExpiry(event.target.value)}>
          <option>1 min</option>
          <option>3 min</option>
          <option>5 min</option>
          <option>15 min</option>
        </select>
      </label>

      <div className="ticket-actions">
        <motion.button className="buy" onClick={() => placeOrder("CALL")} {...buttonMotion}>
          <ArrowUp size={18} />
          Call / Up
        </motion.button>
        <motion.button className="sell" onClick={() => placeOrder("PUT")} {...buttonMotion}>
          <ArrowDown size={18} />
          Put / Down
        </motion.button>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

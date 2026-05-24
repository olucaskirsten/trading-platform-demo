import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { api } from "../services/api.js";
import { formatCurrency } from "../utils/formatters.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.getOrders().then((data) => setOrders(data.orders));
  }, []);

  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Trade history"
        title="Simulated order timeline"
        description="Review previous mock trades, directions, results and simulated profit or loss."
      />

      <motion.div
        className="table-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
      >
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Asset</th>
              <th>Direction</th>
              <th>Stake</th>
              <th>Result</th>
              <th>Profit / Loss</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.08)" }}
              >
                <td>{order.id}</td>
                <td>{order.asset}</td>
                <td>{order.direction}</td>
                <td>{formatCurrency(order.stake)}</td>
                <td>{order.result}</td>
                <td className={order.profit >= 0 ? "positive" : "negative"}>
                  {formatCurrency(order.profit)}
                </td>
                <td>{order.createdAt}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </AnimatedPage>
  );
}

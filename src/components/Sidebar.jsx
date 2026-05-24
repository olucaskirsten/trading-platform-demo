import { NavLink } from "react-router-dom";
import { Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { navigation } from "../data/navigation.js";

export default function Sidebar() {
  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -26, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <motion.div
        className="brand"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <motion.div
          className="brand-mark"
          animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cpu size={22} />
        </motion.div>
        <div>
          <strong>QuantumTrade</strong>
          <span>Simulator</span>
        </div>
      </motion.div>

      <nav className="nav-list">
        {navigation.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + index * 0.045 }}
              whileHover={{ x: 4 }}
            >
              <NavLink to={item.path} className="nav-item">
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      <motion.div
        className="sidebar-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
      >
        <span>Demo mode</span>
        <strong>No real trades are executed.</strong>
      </motion.div>
    </motion.aside>
  );
}

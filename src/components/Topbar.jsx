import { LogOut, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <motion.header
      className="topbar"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36 }}
    >
      <motion.div
        className="search-box"
        whileFocusWithin={{ scale: 1.015, borderColor: "rgba(139, 92, 246, 0.58)" }}
      >
        <Search size={18} />
        <input placeholder="Search assets, orders or markets..." />
      </motion.div>

      <div className="topbar-user">
        <div>
          <strong>{user?.name}</strong>
          <span>{user?.role}</span>
        </div>
        <motion.button
          className="icon-button"
          onClick={logout}
          aria-label="Log out"
          whileHover={{ y: -2, rotate: 3 }}
          whileTap={{ scale: 0.92 }}
        >
          <LogOut size={18} />
        </motion.button>
      </div>
    </motion.header>
  );
}

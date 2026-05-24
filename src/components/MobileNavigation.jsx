import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "../data/navigation.js";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const mobileNavigation = useMemo(() => {
    const accountItem = navigation.find((item) => item.path === "/account");
    const otherItems = navigation.filter((item) => item.path !== "/account");

    return accountItem ? [accountItem, ...otherItems] : navigation;
  }, []);

  return (
    <div className="mobile-navigation">
      <div className="mobile-navigation-bar">
        <div>
          <strong>QuantumTrade</strong>
          <span>Simulator</span>
        </div>

        <motion.button
          className="mobile-menu-button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          whileTap={{ scale: 0.92 }}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-dropdown-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            {mobileNavigation.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035 }}
                >
                  <NavLink
                    to={item.path}
                    className="mobile-dropdown-item"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
import "./Watchlist.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Bell, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedPage from "../../components/AnimatedPage.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import { api } from "../../services/api.js";
import { formatPercent } from "../../utils/formatters.js";

export default function Watchlist() {
  const [assets, setAssets] = useState([]);
  const [alertModal, setAlertModal] = useState(null);

  useEffect(() => {
    api.getMarket().then((data) => setAssets(data.assets));
  }, []);

  return (
    <AnimatedPage>
      <PageHeader
        eyebrow="Watchlist"
        title="Favorite trading instruments"
        description="A focused page for monitoring assets that deserve quick attention during the simulated session."
      />

      <div className="watchlist">
        {assets.map((asset, index) => (
          <motion.article
            key={asset.id}
            className="watch-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ y: -4, scale: 1.006 }}
          >
            <motion.div
              className="watch-icon"
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
            >
              <Star size={18} />
            </motion.div>
            <div>
              <h2>{asset.symbol}</h2>
              <p>{asset.name}</p>
              <span>{asset.category} · {asset.volatility} volatility</span>
            </div>
            <strong className={asset.change >= 0 ? "positive" : "negative"}>
              {formatPercent(asset.change)}
            </strong>
            <motion.button
              className="secondary-button"
              type="button"
              onClick={() => setAlertModal(asset)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Bell size={16} />
              Alert
            </motion.button>
          </motion.article>
        ))}

      </div>

      {createPortal(
        <AnimatePresence>
          {alertModal && (
            <motion.div
              className="alert-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAlertModal(null)}
            >
              <motion.div
                className="alert-modal"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.24 }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="alert-modal-close"
                  type="button"
                  onClick={() => setAlertModal(null)}
                  aria-label="Close alert confirmation"
                >
                  <X size={18} />
                </button>

                <div className="alert-modal-icon">
                  <Bell size={24} />
                </div>

                <span>Alert enabled</span>

                <h2>{alertModal.symbol} notifications are now active.</h2>

                <p>
                  You will receive an email notification when there is a relevant
                  movement or update related to {alertModal.name}.
                </p>

                <button
                  className="primary-button alert-modal-button"
                  type="button"
                  onClick={() => setAlertModal(null)}
                >
                  Got it
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </AnimatedPage>
  );
}

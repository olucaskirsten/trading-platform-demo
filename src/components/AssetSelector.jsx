import { motion } from "framer-motion";

export default function AssetSelector({ assets, selectedAsset, onSelect }) {
  return (
    <motion.div
      className="asset-grid"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } }
      }}
    >
      {assets.map((asset) => (
        <motion.button
          type="button"
          key={asset.id}
          className={`asset-tile ${selectedAsset === asset.id ? "selected" : ""}`}
          onClick={() => onSelect(asset.id)}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ y: -5, scale: 1.015 }}
          whileTap={{ scale: 0.97 }}
          layout
        >
          <div>
            <strong>{asset.symbol}</strong>
            <span>{asset.name}</span>
          </div>
          <motion.small
            className={asset.change >= 0 ? "positive" : "negative"}
            key={`${asset.id}-${asset.change}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {asset.change >= 0 ? "+" : ""}
            {asset.change}%
          </motion.small>
        </motion.button>
      ))}
    </motion.div>
  );
}

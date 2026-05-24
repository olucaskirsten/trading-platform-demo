import { motion } from "framer-motion";

export default function PageHeader({ eyebrow, title, description }) {
  return (
    <motion.div
      className="page-header"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </motion.div>
  );
}

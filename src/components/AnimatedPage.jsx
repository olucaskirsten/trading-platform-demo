import { motion } from "framer-motion";
import { pageTransition } from "../utils/animations.js";

export default function AnimatedPage({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

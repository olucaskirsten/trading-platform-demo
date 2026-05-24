import { motion } from "framer-motion";
import { staggerContainer } from "../utils/animations.js";

export default function AnimatedGrid({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

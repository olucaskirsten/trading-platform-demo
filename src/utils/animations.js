export const pageTransition = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: 12,
    filter: "blur(8px)",
    transition: { duration: 0.2 }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.06
    }
  }
};

export const cardReveal = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
  }
};

export const softPop = {
  whileHover: {
    y: -5,
    scale: 1.015,
    transition: { duration: 0.22, ease: "easeOut" }
  },
  whileTap: {
    scale: 0.98
  }
};

export const buttonMotion = {
  whileHover: {
    scale: 1.03,
    boxShadow: "0 18px 45px rgba(139, 92, 246, 0.28)"
  },
  whileTap: {
    scale: 0.97
  }
};

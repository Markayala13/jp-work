"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }}
          className="fixed inset-0 z-[9999] bg-bark flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="font-heading text-4xl font-semibold text-cream tracking-tight mb-10"
          >
            work <span className="italic font-light text-sage">JP</span>
          </motion.span>

          {/* Loading bar */}
          <div className="w-40 h-[1.5px] bg-cream/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
              className="h-full w-full bg-sage rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

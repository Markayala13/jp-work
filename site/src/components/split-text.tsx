"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function SplitText({ text, className, delay = 0, style }: SplitTextProps) {
  const words = text.split(" ");

  return (
    <span className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.65,
              delay: delay + i * 0.08,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

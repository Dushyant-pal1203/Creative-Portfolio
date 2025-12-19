import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface MarqueeProps {
  items: string[];
  speed?: number; // higher = faster
  className?: string;
}

export default function Marquee({
  items,
  speed = 20,
  className = "",
}: MarqueeProps) {
  const controls = useAnimation();

  const repeatedItems = [...items, ...items];

  // higher speed => shorter duration
  const duration = 100 / speed;

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration,
        ease: "linear",
      },
    });
  }, [controls, duration]);

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          x: ["0%", "-50%"],
          transition: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        })
      }
    >
      <motion.div className="inline-flex" animate={controls}>
        {repeatedItems.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-8 px-8 text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground"
          >
            {item}
            <span className="w-2 h-2 bg-primary rotate-45" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

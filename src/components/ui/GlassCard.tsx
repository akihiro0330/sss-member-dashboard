import type {
  MouseEvent,
  ReactNode,
} from "react";
import { useState } from "react";
import { motion } from "framer-motion";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [hovered, setHovered] = useState(false);

  function handleMouseMove(
    event: MouseEvent<HTMLDivElement>,
  ) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 28,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-white/70
        bg-white/55
        shadow-[0_18px_50px_rgba(32,79,125,0.07)]
        backdrop-blur-2xl
        dark:border-white/10
        dark:bg-white/[0.055]
        dark:shadow-[0_22px_60px_rgba(0,0,0,0.25)]
        ${className}
      `}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-px
          z-0
          transition-opacity
          duration-300
        "
        style={{
          opacity: hovered ? 1 : 0,
          background: `
            radial-gradient(
              350px circle at ${position.x}px ${position.y}px,
              rgba(255,255,255,0.55),
              rgba(72,149,255,0.12) 35%,
              transparent 70%
            )
          `,
        }}
      />

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
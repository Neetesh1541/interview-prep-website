"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBackgroundProps {
  children: ReactNode
}

export function AnimatedGradientBackground({ children }: AnimatedGradientBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10%] opacity-50 dark:opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1), transparent 25%), " +
              "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1), transparent 35%), " +
              "radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.08), transparent 35%)",
          }}
          animate={{
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 px-4">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <Link href="/" className="mb-8 font-semibold text-xl tracking-tight block">
          Credex
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.08 }}
        className="w-full max-w-sm"
      >
        {children}
      </motion.div>
    </div>
  );
}

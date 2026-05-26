"use client";

import { motion } from "framer-motion";
import styles from "@/components/components.module.css";

interface Props {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ResultsScoreRing({ score, size = 88, strokeWidth = 7 }: Props) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - circ * (score / 100);
  const color = score >= 75 ? "#34d399" : score >= 50 ? "#fbbf24" : "#f87171";
  const cx = size / 2;

  return (
    <div
      className={`relative flex items-center justify-center ${styles.scoreRingWrapper}`}
      style={{ "--ring-size": `${size}px` } as React.CSSProperties}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.34, 1.2, 0.64, 1], delay: 0.4 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`text-xl font-bold tabular-nums leading-none ${styles.scoreColor}`}
          style={{ "--score-color": color } as React.CSSProperties}
        >
          {score}
        </span>
        <span className="text-[10px] text-muted-foreground mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

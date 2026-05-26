"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ── Motion wrapper ────────────────────────────────────────────────────────────

export function SkeletonFadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Staggered list wrapper ────────────────────────────────────────────────────

export function SkeletonList({
  count,
  className,
  itemClassName,
  renderItem,
}: {
  count: number;
  className?: string;
  itemClassName?: string;
  renderItem: (index: number) => React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
          }}
        >
          {renderItem(i)}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Primitives ────────────────────────────────────────────────────────────────

function SkeletonCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.06] bg-card overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

// ── Button skeleton ───────────────────────────────────────────────────────────

export function ButtonSkeleton({
  size = "default",
  className,
}: {
  size?: "xs" | "sm" | "default" | "lg";
  className?: string;
}) {
  const sizeMap = {
    xs: "h-6 w-16 rounded-md",
    sm: "h-7 w-20 rounded-md",
    default: "h-8 w-24 rounded-lg",
    lg: "h-9 w-28 rounded-lg",
  };
  return <Skeleton className={cn(sizeMap[size], className)} />;
}

// ── Stat card (hero stats row) ────────────────────────────────────────────────

export function StatCardSkeleton() {
  return (
    <SkeletonCard className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-3 w-40" />
      </div>
    </SkeletonCard>
  );
}

// ── Efficiency score panel ────────────────────────────────────────────────────

export function EfficiencyPanelSkeleton() {
  return (
    <SkeletonCard className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex items-center gap-5 shrink-0">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-3 w-56" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="hidden sm:block w-px self-stretch bg-white/[0.06]" />
        <div className="flex flex-wrap gap-6 flex-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-2.5 w-16" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonCard>
  );
}

// ── Hero stats block ──────────────────────────────────────────────────────────

export function HeroStatsSkeleton() {
  return (
    <SkeletonFadeIn className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <EfficiencyPanelSkeleton />
    </SkeletonFadeIn>
  );
}

// ── Chart skeleton (animated bars) ───────────────────────────────────────────

const BAR_HEIGHTS = [65, 40, 80, 55, 90, 45, 70, 60, 85, 50, 75, 95];

export function ChartSkeleton({ height = 200 }: { height?: number }) {
  return (
    <SkeletonCard className="p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="flex items-center gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-14" />
          ))}
        </div>
      </div>

      {/* Animated bar chart */}
      <div
        className="flex items-end gap-2 w-full"
        style={{ height }}
        aria-hidden="true"
        role="presentation"
      >
        {BAR_HEIGHTS.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-muted relative overflow-hidden skeleton-bar"
            style={{
              height: `${h}%`,
              animationDelay: `${i * 40}ms`,
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              duration: 0.45,
              ease: [0.21, 0.47, 0.32, 0.98],
              delay: i * 0.04,
            }}
          >
            <div className="shimmer" />
          </motion.div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between">
        {["Jan", "Apr", "Jul", "Oct"].map((m) => (
          <Skeleton key={m} className="h-2.5 w-6" />
        ))}
      </div>
    </SkeletonCard>
  );
}

// ── Provider pill skeleton ────────────────────────────────────────────────────

export function ProviderPillSkeleton() {
  return (
    <SkeletonCard className="px-4 py-3 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="w-2 h-2 rounded-full" />
        <Skeleton className="h-3 w-14" />
      </div>
      <Skeleton className="h-7 w-8" />
      <Skeleton className="h-3 w-16" />
    </SkeletonCard>
  );
}

// ── Recommendation card skeleton ──────────────────────────────────────────────

export function RecommendationCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: index * 0.06,
      }}
    >
      <SkeletonCard className="px-5 py-4 flex items-start gap-4">
        <Skeleton className="w-9 h-9 rounded-xl shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-1.5 w-16 rounded-full" />
        </div>
      </SkeletonCard>
    </motion.div>
  );
}

// ── Stats grid (dashboard overview) ──────────────────────────────────────────

export function StatsGridSkeleton() {
  return (
    <SkeletonList
      count={4}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      renderItem={() => (
        <SkeletonCard className="p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <div className="flex items-end justify-between">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-3.5 w-12" />
          </div>
        </SkeletonCard>
      )}
    />
  );
}

// ── Table row skeleton ────────────────────────────────────────────────────────

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  const widths = ["w-32", "w-24", "w-20", "w-16", "w-12"];
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-white/[0.04]">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className={cn("h-3.5", widths[i % widths.length])} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <SkeletonFadeIn>
      <SkeletonCard>
        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-white/[0.06]">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-20" />
          ))}
        </div>
        <SkeletonList
          count={rows}
          renderItem={() => <TableRowSkeleton cols={cols} />}
        />
      </SkeletonCard>
    </SkeletonFadeIn>
  );
}

// ── Integration card skeleton ─────────────────────────────────────────────────

export function IntegrationCardSkeleton() {
  return (
    <SkeletonCard className="p-4 flex items-center gap-4">
      <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
    </SkeletonCard>
  );
}

// ── Page header skeleton ──────────────────────────────────────────────────────

export function PageHeaderSkeleton({ hasAction = false }: { hasAction?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      {hasAction && <ButtonSkeleton size="default" className="w-28 rounded-full" />}
    </div>
  );
}

// ── Public results page header skeleton ──────────────────────────────────────

export function ResultsHeaderSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-52" />
      </div>
      <Skeleton className="h-8 w-36 rounded-lg" />
    </div>
  );
}

// ── Public results hero stats (4-col grid) ────────────────────────────────────

export function ResultsHeroSkeleton() {
  return (
    <SkeletonList
      count={4}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      renderItem={() => (
        <SkeletonCard className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </SkeletonCard>
      )}
    />
  );
}

// ── AI summary block skeleton ─────────────────────────────────────────────────

export function AISummarySkeleton() {
  return (
    <SkeletonCard className="p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-4/5" />
    </SkeletonCard>
  );
}

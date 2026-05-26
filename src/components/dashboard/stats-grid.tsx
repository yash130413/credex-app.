"use client";

import { TrendingUp, TrendingDown, Cpu, Search, DollarSign, Activity } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerChildren, StaggerItem } from "@/components/shared/motion";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import type { DashboardStats } from "@/types";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ElementType;
}

function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const reduce = useReducedMotion();

  return (
    <Card hover>
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{title}</span>
          <motion.div
            whileHover={reduce ? {} : { scale: 1.12, rotate: 6 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
          >
            <Icon className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">{value}</span>
          {change !== undefined && (
            <span
              className={`flex items-center gap-1 text-xs font-medium ${
                isPositive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              <TrendIcon className="w-3 h-3" />
              {formatPercent(change)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsGrid({ stats }: { stats: DashboardStats }) {
  return (
    <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StaggerItem>
        <StatCard
          title="Total Spend"
          value={formatCurrency(stats.totalSpend)}
          change={stats.spendChange}
          icon={DollarSign}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          title="Total Tokens"
          value={formatNumber(stats.totalTokens)}
          change={stats.tokensChange}
          icon={Cpu}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          title="Active Providers"
          value={String(stats.activeProviders)}
          icon={Activity}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          title="Est. Savings"
          value={formatCurrency(stats.estimatedSavings)}
          icon={Search}
        />
      </StaggerItem>
    </StaggerChildren>
  );
}

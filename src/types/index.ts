export type Plan = "starter" | "pro" | "enterprise";

export type AuditStatus = "pending" | "running" | "completed" | "failed";

export type Provider =
  | "openai"
  | "anthropic"
  | "gemini"
  | "cohere"
  | "mistral"
  | "custom";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: Plan;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
  ownerId: string;
}

export interface AIProvider {
  id: string;
  name: string;
  provider: Provider;
  apiKeyMasked: string;
  isActive: boolean;
  connectedAt: string;
}

export interface SpendRecord {
  date: string;
  provider: Provider;
  model: string;
  tokens: number;
  cost: number;
  requests: number;
}

export interface Audit {
  id: string;
  name: string;
  status: AuditStatus;
  provider: Provider;
  startDate: string;
  endDate: string;
  totalCost: number;
  totalTokens: number;
  findings: AuditFinding[];
  createdAt: string;
}

export interface AuditFinding {
  id: string;
  type: "waste" | "anomaly" | "optimization" | "risk";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  estimatedSavings?: number;
}

export interface DashboardStats {
  totalSpend: number;
  spendChange: number;
  totalTokens: number;
  tokensChange: number;
  activeProviders: number;
  auditsRun: number;
  estimatedSavings: number;
}

export interface SpendChartData {
  date: string;
  openai: number;
  anthropic: number;
  gemini: number;
  other: number;
}

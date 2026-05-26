import Anthropic from "@anthropic-ai/sdk";
import { formatCurrency } from "@/lib/utils";
import type { AuditEngineResult, AuditRecommendation } from "@/types/audit-engine";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SummarizeInput {
  auditTitle: string;
  result: AuditEngineResult;
}

export interface SummarizeOutput {
  summary: string;
  source: "anthropic" | "fallback";
  /** Populated when source === "fallback" */
  fallbackReason?: string;
}

// Classified so callers can decide whether to retry or accept the fallback
export type SummarizeErrorKind =
  | "missing_api_key"
  | "rate_limited"
  | "overloaded"
  | "invalid_request"
  | "unknown";

export class SummarizeError extends Error {
  constructor(
    public readonly kind: SummarizeErrorKind,
    message: string,
    public readonly retryable: boolean
  ) {
    super(message);
    this.name = "SummarizeError";
  }
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MODEL = "claude-3-5-haiku-20241022"; // fast + cheap for summaries
const MAX_TOKENS = 400;
const TIMEOUT_MS = 12_000;

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildPrompt(input: SummarizeInput): string {
  const { auditTitle, result } = input;

  const topRecs = result.recommendations
    .slice(0, 5) // cap at 5 to keep prompt tight
    .map((r: AuditRecommendation, i: number) =>
      `${i + 1}. [${r.priority}] ${r.title} (${r.provider}) — ${formatCurrency(r.monthlySavings)}/mo · ${r.recommendation}`
    )
    .join("\n");

  const wastePercent =
    result.totalCurrentSpend > 0
      ? ((result.totalMonthlySavings / result.totalCurrentSpend) * 100).toFixed(1)
      : "0";

  return `You are an AI spend optimization analyst. Write a concise executive summary (3–4 sentences, plain prose, no bullet points, no markdown) for the following AI software audit.

Audit: ${auditTitle}
Providers scanned: ${result.providersScanned.join(", ")}
Total monthly spend: ${formatCurrency(result.totalCurrentSpend)}
Recoverable monthly savings: ${formatCurrency(result.totalMonthlySavings)} (${wastePercent}% of spend)
Recoverable annual savings: ${formatCurrency(result.totalAnnualSavings)}
Optimization score: ${result.optimizationScore}/100
Critical findings: ${result.criticalCount} · High findings: ${result.highCount}

Top recommendations:
${topRecs}

Write the summary now. Be specific about the dollar amounts and providers. Do not use headers, lists, or markdown.`;
}

// ── Fallback generator ────────────────────────────────────────────────────────

function buildFallback(input: SummarizeInput): string {
  const { auditTitle, result } = input;

  const topProvider = result.recommendations[0]?.provider ?? result.providersScanned[0];
  const wastePercent =
    result.totalCurrentSpend > 0
      ? ((result.totalMonthlySavings / result.totalCurrentSpend) * 100).toFixed(1)
      : "0";

  const criticalLine =
    result.criticalCount > 0
      ? ` ${result.criticalCount} critical finding${result.criticalCount > 1 ? "s" : ""} require immediate attention.`
      : "";

  return `This audit of ${auditTitle} identified ${result.recommendations.length} optimization opportunities across ${result.providersScanned.length} AI provider${result.providersScanned.length !== 1 ? "s" : ""}, with ${formatCurrency(result.totalMonthlySavings)}/month (${wastePercent}% of total spend) recoverable in savings.${criticalLine} The highest-impact opportunity involves ${topProvider}, and addressing the top recommendations could save ${formatCurrency(result.totalAnnualSavings)} annually. Review the findings below and prioritize by severity to maximize ROI on your AI software investment.`;
}

// ── Error classifier ──────────────────────────────────────────────────────────

function classifyError(err: unknown): SummarizeError {
  if (err instanceof Anthropic.APIError) {
    if (err.status === 429) {
      return new SummarizeError("rate_limited", "Anthropic rate limit reached", true);
    }
    if (err.status === 529) {
      return new SummarizeError("overloaded", "Anthropic API overloaded", true);
    }
    if (err.status === 400) {
      return new SummarizeError("invalid_request", err.message, false);
    }
    if (err.status === 401) {
      return new SummarizeError("missing_api_key", "Invalid Anthropic API key", false);
    }
  }
  if (err instanceof Error && err.name === "AbortError") {
    return new SummarizeError("overloaded", `Request timed out after ${TIMEOUT_MS}ms`, true);
  }
  return new SummarizeError(
    "unknown",
    err instanceof Error ? err.message : "Unknown error",
    false
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function generateAuditSummary(
  input: SummarizeInput
): Promise<SummarizeOutput> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      summary: buildFallback(input),
      source: "fallback",
      fallbackReason: "ANTHROPIC_API_KEY not configured",
    };
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const message = await client.messages.create(
      {
        model: MODEL,
        max_tokens: MAX_TOKENS,
        messages: [{ role: "user", content: buildPrompt(input) }],
      },
      { signal: controller.signal }
    );

    const block = message.content[0];
    if (block.type !== "text" || !block.text.trim()) {
      throw new SummarizeError("unknown", "Empty response from Anthropic", false);
    }

    return { summary: block.text.trim(), source: "anthropic" };
  } catch (err) {
    const classified = classifyError(err);

    // Always return a usable summary — never let AI failure break the audit flow
    return {
      summary: buildFallback(input),
      source: "fallback",
      fallbackReason: `${classified.kind}: ${classified.message}`,
    };
  } finally {
    clearTimeout(timer);
  }
}

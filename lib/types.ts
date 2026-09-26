export type RunTrace = {
  trace_id: string;
  provider?: string;
  model?: string;
  fallback_used?: boolean;
  gpu_state?: string;
  route?: string[];
  skills_loaded?: string[];
  tools_called?: { name: string; ms: number; ok: boolean }[];
  tokens?: { input?: number; cached_input?: number; output?: number; reasoning?: number };
  latency_ms?: { ttft?: number; total?: number };
  tokens_per_second?: number;
  cost_usd?: { this_answer?: number | null; hosted_equivalent?: number | null };
  groundedness?: { score?: number; floor?: number; retried?: boolean };
  checks?: { name: string; passed: boolean }[];
  policy_decision?: string;
  prompt_version?: string;
};

export type Citation = { id: string; label: string };

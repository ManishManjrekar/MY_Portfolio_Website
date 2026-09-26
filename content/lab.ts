export type LabStatus = "built" | "in-progress" | "planned";

export type LabProject = {
  n: number;
  title: string;
  status: LabStatus;
  problem: string;
  proves: string;
  patterns: string[];
  design: string;
  runs: string;
  result?: string; // publish only measured numbers
};

// Status mirrors the repo's CLAUDE.md. Update as each project lands.
export const lab: LabProject[] = [
  {
    n: 1, title: "Dockerfile generation with a local LLM", status: "built",
    problem: "Correct Dockerfiles per repo need Docker expertise not every developer has.",
    proves: "An LLM used as one component in a pipeline, not the whole app.",
    patterns: ["Generator–validator loop", "Deterministic scanner first"],
    design: "A deterministic repo scanner feeds the prompt; Ollama generates; a real docker build validates; stderr goes back as feedback, up to three tries.",
    runs: "Laptop, Ollama, CLI",
  },
  {
    n: 2, title: "Production LLM serving on Kubernetes", status: "planned",
    problem: "Single-process serving can't handle concurrent production traffic.",
    proves: "Serving a model reliably at scale, not just calling it once.",
    patterns: ["Continuous batching", "Model-aware routing"],
    design: "vLLM with PagedAttention behind Deployment, Service and Ingress, packaged with Helm.",
    runs: "kind or minikube with a small model",
  },
  {
    n: 3, title: "DevOps and AIOps, end to end", status: "planned",
    problem: "Platforms that only alert humans don't scale.",
    proves: "A platform that watches itself and fixes problems before users notice.",
    patterns: ["Observe, analyse, act", "Agent as SRE"],
    design: "Metrics, logs and traces feed anomaly detection; remediation runs as an event-driven loop.",
    runs: "Prometheus, Grafana and Loki on kind",
  },
  {
    n: 4, title: "GPU autoscaling with KServe", status: "planned",
    problem: "Static GPU allocation wastes money or spikes latency.",
    proves: "Capacity that follows real load instead of guesswork.",
    patterns: ["Custom-metric autoscaling", "Serverless inference"],
    design: "Concurrency-based scaling on KServe; GPU scheduling with taints and device plugins.",
    runs: "KServe on kind with a CPU predictor",
  },
  {
    n: 5, title: "Scale-to-zero inference with KEDA", status: "planned",
    problem: "Idle GPU nodes are the biggest wasted cost in inference.",
    proves: "Paying nothing for GPUs while nobody is asking.",
    patterns: ["Queue–worker", "Scale to zero", "Pre-warming"],
    design: "A queue buffers requests while workers wake; pre-warming trades a little idle cost for shorter cold starts.",
    runs: "KEDA and Redis on kind",
  },
];

export const statusLabel: Record<LabStatus, string> = {
  built: "Built",
  "in-progress": "In progress",
  planned: "Planned",
};

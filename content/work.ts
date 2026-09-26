export type Bucket = "agent" | "pipeline" | "not-genai";

export const bucketLabels: Record<Bucket, string> = {
  agent: "Agent-shaped",
  pipeline: "GenAI pipeline",
  "not-genai": "Not GenAI",
};

export const bucketNotes: Record<Bucket, string> = {
  agent: "Iterative reasoning across systems, tools with consequences, human sign-off.",
  pipeline: "Real language work, single pass. No agent framework needed.",
  "not-genai": "Solved with engineering or classic ML. An LLM here would be slower and costlier.",
};

export type CaseStudy = {
  id: string;
  title: string;
  org: string;
  bucket: Bucket;
  outcome: string;
  detail: string;
  stack: string[];
};

// Facts only, taken from the resume. Add a new study by appending an object.
export const caseStudies: CaseStudy[] = [
  {
    id: "sdlc-agents",
    title: "Autonomous software-delivery agents",
    org: "NStarX",
    bucket: "agent",
    outcome: "A 7-agent orchestration framework that runs software-delivery workflows end to end.",
    detail: "Multi-LLM design across OpenAI, Anthropic and Google models, with governance checkpoints, human-in-the-loop validation, orchestration observability and hallucination mitigation.",
    stack: ["Azure OpenAI", "LangChain", "AutoGen", "Multi-LLM"],
  },
  {
    id: "nyc-doe",
    title: "Device intelligence for NYC Department of Education",
    org: "NStarX",
    bucket: "pipeline",
    outcome: "AI-powered device intelligence platform, taken to deployment.",
    detail: "Integrates NLP analytics, Microsoft Copilot and automated data synchronisation.",
    stack: ["NLP analytics", "Microsoft Copilot", "Data sync"],
  },
  {
    id: "nl-to-sql",
    title: "Natural-language analytics",
    org: "Deloitte",
    bucket: "pipeline",
    outcome: "Non-technical users query enterprise databases in plain English.",
    detail: "NLP-to-SQL systems built during Deloitte's AI incubation work, alongside RAG chatbots and GenAI automation.",
    stack: ["NLP-to-SQL", "RAG", "Azure OpenAI"],
  },
  {
    id: "observability",
    title: "Observability and control room",
    org: "Deloitte",
    bucket: "not-genai",
    outcome: "About $500K a year saved and a third-party dependency removed.",
    detail: "An in-house observability and control-room platform replacing external tooling.",
    stack: ["Observability", "Platform engineering"],
  },
  {
    id: "cloud-migration",
    title: "700+ applications to Azure PaaS",
    org: "Wells Fargo",
    bucket: "not-genai",
    outcome: "Enterprise migration strategy for 700+ applications.",
    detail: "Governance and migration-management platforms for readiness and visibility, plus RBAC and Azure AD integration for identity governance.",
    stack: ["Azure PaaS", "Azure AD", "RBAC", "Governance"],
  },
];

export type Repo = {
  name: string;
  lang: string;
  visibility: "public" | "private";
  note?: string;
  href?: string;
};

// From github.com/ManishManjrekar. Private repos show no link; visitors can ask for a walkthrough.
export const repos: Repo[] = [
  { name: "GenAI-Architecture", lang: "HTML", visibility: "private", note: "Live reference architecture", href: "https://genai-architecture.vercel.app" },
  { name: "genai-poc-projects", lang: "Python", visibility: "private", note: "AI infrastructure lab" },
  { name: "OpenClaw-JobSubmission", lang: "TypeScript", visibility: "private", note: "Automated job submission" },
  { name: "QuantumAI", lang: "TypeScript", visibility: "private" },
  { name: "JobPortal_AIEnabled", lang: "—", visibility: "private", note: "AI-enabled job portal" },
  { name: "TTSAndSTT", lang: "Python", visibility: "private", note: "Speech to text and back" },
  { name: "AzureOpenAIPoc", lang: "C#", visibility: "public", href: "https://github.com/ManishManjrekar/AzureOpenAIPoc" },
  { name: "BlazorPoc", lang: "C#", visibility: "public", href: "https://github.com/ManishManjrekar/BlazorPoc" },
  { name: "AccountsUIBlazor", lang: "C#", visibility: "public", href: "https://github.com/ManishManjrekar/AccountsUIBlazor" },
];

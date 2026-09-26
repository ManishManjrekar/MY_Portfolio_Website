// Everything a visitor reads lives in /content. Edit these files, not the components.

export const profile = {
  name: "M. Manish Raj",
  shortName: "Manish Raj",
  initials: "MR",
  role: "Enterprise AI & Solution Architect",
  location: "Hyderabad, India",
  availability: "Open to principal and AI architect roles. Open to relocation; US business visa.",

  // Hero headline. The fact-based version is live by default because every word is
  // backed by the resume. Swap in `headlineBold` once you have published evidence
  // (decision records or the regression-vs-LLM benchmark) behind it.
  headline: "I design agentic AI that enterprises can actually trust.",
  headlineBold: "I build AI systems that know when not to use AI.",

  summaryRecruiter:
    "17+ years across Wells Fargo, Deloitte and NStarX: from moving 700+ enterprise applications to the cloud, to architecting a 7-agent orchestration platform with governance checkpoints and human sign-off built in.",
  summaryArchitect:
    "Detection stays statistical. Agents sit downstream of the ML layer, tools stay read-only until a policy gate says otherwise, and reversibility decides who approves. That pattern runs through the work on this page.",

  email: "manjrekar.raj7@gmail.com",
  linkedin: "https://www.linkedin.com/in/manjrekar-manish-raj",
  github: "https://github.com/ManishManjrekar",
  architectureUrl: "https://genai-architecture.vercel.app",
  // Export your updated resume to /public/resume.pdf (update its portfolio link first).
  resumeUrl: "/resume.pdf",
  // Optional: a Calendly (or similar) link. Empty = the call button falls back to email.
  bookingUrl: "",
};

export const impact = [
  { value: "17+", label: "years in enterprise engineering" },
  { value: "700+", label: "applications migrated to the cloud" },
  { value: "~$500K", label: "annual savings from one observability platform" },
  { value: "30", label: "engineers led on a single program" },
  { value: "7", label: "agents in an SDLC orchestration framework" },
];

export const principles = [
  {
    title: "Sort before you build",
    body: "Not GenAI, a GenAI pipeline, or genuinely agent-shaped. The category picks the architecture.",
  },
  {
    title: "Agents sit downstream",
    body: "Models produce signals; the agent does the reasoning an operator does today, with read-only tools.",
  },
  {
    title: "The gate decides",
    body: "Guardrails lower the odds of a bad outcome. Only the policy gate turns a proposal into an action.",
  },
];

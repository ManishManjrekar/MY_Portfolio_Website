export type Role = {
  org: string;
  title: string;
  period: string;
  start: string;
  carried: string; // what this role handed to the next one (shown on the path)
  points: string[];
};

export const career: Role[] = [
  {
    org: "Cognizant Technology Solutions",
    title: "Technical Lead",
    period: "Jan 2014 – Mar 2015",
    start: "2014",
    carried: "delivery governance",
    points: [
      "Led architecture reviews, sprint execution and technical governance for Microsoft Global Delivery programs.",
      "Owned requirement analysis, technical documentation and mentoring across distributed teams.",
    ],
  },
  {
    org: "Wells Fargo India",
    title: "Associate Technical Architect, Cloud Engineering & Migration",
    period: "Apr 2015 – Oct 2019",
    start: "2015",
    carried: "700+ apps to Azure PaaS",
    points: [
      "Designed and executed the migration strategy for 700+ applications to Azure PaaS.",
      "Built cloud governance and migration-management platforms for readiness and visibility.",
      "Implemented RBAC and Azure Active Directory integration for enterprise identity governance.",
      "Built an enterprise chatbot on Microsoft Bot Framework during innovation initiatives.",
    ],
  },
  {
    org: "Deloitte, Audit Business Line",
    title: "Technical Architect / Executive Manager",
    period: "Nov 2019 – Sep 2025",
    start: "2019",
    carried: "RAG and 30-engineer teams",
    points: [
      "Led AI incubation: RAG chatbots, NLP analytics platforms and GenAI-driven automation.",
      "Ran architecture governance, sprint planning and risk for 30-engineer teams.",
      "Built an observability and control-room platform worth ~$500K a year in savings.",
      "Delivered code-generation tools and Power Automate solutions for engineering productivity.",
    ],
  },
  {
    org: "NStarX, AI Innovation Division",
    title: "AI Architect & Solution Architect",
    period: "Oct 2025 – present",
    start: "Now",
    carried: "",
    points: [
      "Architected a 7-agent orchestration framework on Azure OpenAI, LangChain and AutoGen for autonomous software delivery.",
      "Designed a multi-LLM architecture across OpenAI, Anthropic and Google models with governance checkpoints and human-in-the-loop validation.",
      "Led an AI device-intelligence platform for the NYC Department of Education with NLP analytics, Microsoft Copilot and automated data sync.",
      "Implemented AI governance, prompt management, orchestration observability and hallucination mitigation.",
    ],
  },
];

export const certifications = [
  "Claude Certified Architect – Foundations (CCFA), Anthropic, July 2026",
  "Microsoft Azure Architect",
  "Tosca UI Automation Specialist L1",
  "Tosca API Automation Specialist",
];

export const education = [
  "Master of Computer Applications (MCA), Osmania University",
  "Bachelor of Commerce (B.Com), Osmania University",
];

export const skills: { group: string; items: string[] }[] = [
  { group: "GenAI and agents", items: ["Azure OpenAI", "LangChain", "AutoGen", "RAG pipelines", "Multi-agent systems", "Prompt engineering", "Whisper", "NLP", "Ollama"] },
  { group: "Cloud and platform", items: ["Azure", "AWS", "Kubernetes", "Docker", "Terraform", "Azure DevOps", "Service Bus", "API Management"] },
  { group: "Architecture", items: ["Microservices", "CQRS", "Event-driven", "Domain-driven design", "Distributed systems"] },
  { group: "Languages and data", items: ["Python", "C# / .NET 8", "TypeScript", "SQL", "MongoDB", "Cosmos DB", "Azure AI Search"] },
];

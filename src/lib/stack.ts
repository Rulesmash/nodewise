export type StackGroup = {
  id: string;
  label: string;
  items: string[];
  usedOn: Array<"sites" | "software" | "platforms">;
};

export const STACK_GROUPS: StackGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["Next.js", "React", "HTML / CSS", "Responsive UI"],
    usedOn: ["sites", "software", "platforms"],
  },
  {
    id: "charts",
    label: "Charts",
    items: ["Plotly"],
    usedOn: ["software", "platforms"],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      "Node.js",
      "Next.js route handlers",
      "REST APIs",
      "Webhooks",
    ],
    usedOn: ["software", "platforms"],
  },
  {
    id: "realtime",
    label: "Realtime & Python",
    items: ["Python", "WebSockets"],
    usedOn: ["platforms"],
  },
  {
    id: "data",
    label: "Data & auth",
    items: [
      "PostgreSQL",
      "Supabase",
      "Supabase Auth",
      "OTP auth",
      "Session / cache",
    ],
    usedOn: ["software", "platforms"],
  },
  {
    id: "cloud",
    label: "Cloud",
    items: ["Vercel", "Supabase Cloud", "VPS"],
    usedOn: ["sites", "software", "platforms"],
  },
  {
    id: "ai",
    label: "AI & realtime",
    items: [
      "Mistral",
      "Gemini",
      "Gemini Live",
      "OpenAI Realtime",
      "Ultravox",
      "Speech-to-speech",
    ],
    usedOn: ["platforms"],
  },
  {
    id: "ml",
    label: "Models",
    items: [
      "Random Forest",
      "Sentiment analysis",
      "Technical indicators",
      "Backtesting",
      "Model retraining",
    ],
    usedOn: ["platforms"],
  },
  {
    id: "aidev",
    label: "AI systems",
    items: [
      "Prompt engineering",
      "RAG",
      "Fine-tuning",
      "Agent playbooks",
      "Knowledge extraction",
    ],
    usedOn: ["platforms"],
  },
];

export const STACK_BY_OFFER = {
  sites: {
    label: "Sites",
    line: "Next.js, React, Vercel. Static, fast, no WordPress.",
    items: ["Next.js", "React", "Vercel"],
  },
  software: {
    label: "Web apps",
    line: "Node APIs, PostgreSQL, Supabase Auth, dashboards you own.",
    items: ["Next.js", "Node.js", "PostgreSQL", "Supabase Auth", "REST APIs"],
  },
  platforms: {
    label: "Platforms",
    line: "Realtime, Python, RAG, and custom models. Quoted.",
    items: ["WebSockets", "Python", "RAG", "Gemini / Mistral", "Postgres"],
  },
} as const;

export function stackGroupsFor(
  offer: "sites" | "software" | "platforms" | "full"
): StackGroup[] {
  if (offer === "full") return STACK_GROUPS;
  return STACK_GROUPS.filter((g) => g.usedOn.includes(offer));
}

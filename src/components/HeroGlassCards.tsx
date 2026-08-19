import { Building2, Layout, Code2, Shield } from "lucide-react";

type CardIcon = "layout" | "code" | "shield" | "building";

const CARD_DATA: {
  id: string;
  className: string;
  title: string;
  body: string;
  meta: string;
  icon: CardIcon | null;
}[] = [
  { id: "price", className: "hero-glass-card--price", title: "Landing", body: "12k\u201315k", meta: "B2B pages, INR", icon: "layout" },
  { id: "time", className: "hero-glass-card--time", title: "Software", body: "25k+", meta: "sites and automation", icon: "code" },
  { id: "own", className: "hero-glass-card--own", title: "Ownership", body: "Full source", meta: "no page builders", icon: "shield" },
  { id: "core", className: "hero-glass-card--core", title: "Platforms", body: "Custom", meta: "quoted multi-user", icon: "building" },
];

function Icon({ name }: { name: CardIcon }) {
  const props = { size: 14 as number, "aria-hidden": true as const, className: "hero-glass-card__svg" };
  if (name === "layout") return <Layout {...props} />;
  if (name === "code") return <Code2 {...props} />;
  if (name === "shield") return <Shield {...props} />;
  return <Building2 {...props} />;
}

export default function HeroGlassCards() {
  return (
    <div className="hero-glass-layer">
      {CARD_DATA.map((card) => (
        <div
          key={card.id}
          className={`hero-glass-card ${card.className}`}
          data-card={card.id}
        >
          <div className="hero-glass-card__top">
            {card.icon ? (
              <span className="hero-glass-card__icon">
                <Icon name={card.icon} />
              </span>
            ) : null}
            <span className="hero-glass-card__label">{card.title}</span>
          </div>
          <p className="hero-glass-card__value">{card.body}</p>
          <p className="hero-glass-card__meta">{card.meta}</p>
        </div>
      ))}
    </div>
  );
}

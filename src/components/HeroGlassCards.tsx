import { Check, Clock, Code2, Shield } from "lucide-react";

type CardIcon = "clock" | "code" | "shield" | "check";

const CARD_DATA: {
  id: string;
  className: string;
  title: string;
  body: string;
  meta: string;
  icon: CardIcon | null;
}[] = [
  { id: "price", className: "hero-glass-card--price", title: "Zero to MVP", body: "\u20B929,999", meta: "one-time", icon: null },
  { id: "time", className: "hero-glass-card--time", title: "Timeline", body: "10\u201314 days", meta: "live and showcase-ready", icon: "clock" },
  { id: "own", className: "hero-glass-card--own", title: "Ownership", body: "Full source", meta: "code + docs transferred", icon: "shield" },
  { id: "core", className: "hero-glass-card--core", title: "Core MVP", body: "Essential features", meta: "responsive web app", icon: "code" },
];

function Icon({ name }: { name: CardIcon }) {
  const props = { size: 14 as number, "aria-hidden": true as const, className: "hero-glass-card__svg" };
  if (name === "clock") return <Clock {...props} />;
  if (name === "code") return <Code2 {...props} />;
  if (name === "shield") return <Shield {...props} />;
  return <Check {...props} />;
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

import { STACK_BY_OFFER, stackGroupsFor } from "@/lib/stack";

type StackBandProps = {
  offer?: "sites" | "software" | "platforms" | "full";
  title?: string;
  lede?: string;
};

export default function StackBand({
  offer = "full",
  title = "Stack",
  lede = "Sites ship as Next.js on Vercel. Web applications add Node, PostgreSQL, and auth. Platforms add Python, realtime, and models when the job requires it.",
}: StackBandProps) {
  const groups = stackGroupsFor(offer);
  const showSku = offer === "full";

  return (
    <section className="stack-band" aria-labelledby="stack-band-title">
      <div className="container">
        <h2 id="stack-band-title" className="stack-band__title">
          {title}
        </h2>
        <p className="stack-band__lede">{lede}</p>

        {showSku ? (
          <ul className="stack-band__skus">
            {Object.values(STACK_BY_OFFER).map((sku) => (
              <li key={sku.label}>
                <strong>{sku.label}.</strong> {sku.line}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="stack-band__grid">
          {groups.map((group) => (
            <div key={group.id} className="stack-band__group">
              <h3 className="stack-band__group-label">{group.label}</h3>
              <ul className="stack-band__items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

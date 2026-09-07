export type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqList({
  items,
  title = "Questions",
}: {
  items: FaqItem[];
  title?: string;
}) {
  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <div className="container">
        <h2 id="faq-heading" className="section-title">
          {title}
        </h2>
        <dl className="faq-list">
          {items.map((item) => (
            <div key={item.question} className="faq-item card">
              <dt>
                <h3 className="faq-question">{item.question}</h3>
              </dt>
              <dd className="faq-answer">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

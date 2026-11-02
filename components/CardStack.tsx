import { education, experiences } from "@/content/site";

const [settle, toast] = experiences;

// Then and now: three cards that take turns at the front. The hero shows this when
// Ask about Will is out of credit for the day or the month.
export function CardStack() {
  const cards = [
    { logo: settle.logo, label: "Now", text: `Co-founder of ${settle.company}` },
    { logo: toast.logo, label: "Before", text: `${toast.positions[0].title} at ${toast.company}` },
    { logo: education[0].logo, label: "Studied", text: "Computer science and business at Northeastern" },
  ];
  return (
    <>
      <div className="stack">
        {cards.map((c, i) => (
          <div key={c.label} className={`stack-card ho-card ho-card-${i + 1}`}>
            <img src={c.logo} alt="" />
            <span className="caption">{c.label}</span>
            <b>{c.text}</b>
          </div>
        ))}
      </div>
      <div className="stack-dots" aria-hidden="true">
        <span className="hc-dot" />
        <span className="hc-dot hc-dot-2" />
        <span className="hc-dot hc-dot-3" />
      </div>
    </>
  );
}

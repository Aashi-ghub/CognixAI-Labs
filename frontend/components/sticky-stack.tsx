"use client"

type Card = {
  title: string
  body: string
  accent?: string
}

function MockPanel() {
  return (
    <div className="img-frame p-4">
      <div className="mock-panel">
        <div className="mock-title" />
        <div className="mock-line" style={{ width: "85%" }} />
        <div className="mock-line" style={{ width: "72%" }} />
        <div className="mock-line" style={{ width: "62%" }} />
        <div className="mt-3 mock-chip">automation</div>
      </div>
    </div>
  )
}

export default function StickyStack({ cards }: { cards: Card[] }) {
  return (
    <section className="stack-section max-w-5xl mx-auto">
      {cards.map((card, i) => (
        <article
          key={i}
          className="stack-card p-6 md:p-8"
          style={{ zIndex: 50 - i, transform: `scale(${1 - i * 0.02})` }}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3
                className="display text-balance text-[var(--fg)] mb-2"
                style={{ fontSize: "clamp(1.6rem,3.2vw,2.2rem)" }}
              >
                {card.title}
              </h3>
              <p className="text-[var(--muted-fg)] leading-relaxed">{card.body}</p>
              {card.accent ? <div className="mt-4 mock-chip">{card.accent}</div> : null}
            </div>
            <MockPanel />
          </div>
        </article>
      ))}
    </section>
  )
}

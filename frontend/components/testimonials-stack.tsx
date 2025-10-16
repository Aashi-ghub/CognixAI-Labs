"use client"

export default function TestimonialsStack() {
  return (
    <section id="testimonials" className="section-dark">
      <div className="mx-auto max-w-6xl px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="h2">What clients say</h2>
          <p className="p muted mt-3">Small, right-aligned cards stack as you scroll.</p>
        </div>
        <div className="stack">
          <article className="stack-card p-6 glow-teal" data-depth="1">
            <div className="text-sm muted">★★★★★</div>
            <div className="mt-1 font-medium">High impact and quick delivery.</div>
          </article>
          <article className="stack-card p-6 mt-6" data-depth="2">
            <div className="text-sm muted">★★★★★</div>
            <div className="mt-1 font-medium">Automation that saves hours each week.</div>
          </article>
          <article className="stack-card p-6 mt-6" data-depth="3">
            <div className="text-sm muted">★★★★★</div>
            <div className="mt-1 font-medium">Trustworthy, thoughtful, and scalable.</div>
          </article>
        </div>
      </div>
    </section>
  )
}

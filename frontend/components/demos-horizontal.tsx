"use client"
export default function DemosHorizontal() {
  const skip = () => {
    const next = document.getElementById("about")
    next?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <section id="demos" className="section-dark">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-2 flex items-center justify-between">
        <h2 className="h2">Interactive Demos</h2>
        <button onClick={skip} className="btn btn-ghost">
          Skip Demo
        </button>
      </div>
      <div className="fullscreen-track">
        <div className="panel">
          <div className="max-w-4xl w-[90vw] rounded-all border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8">
            <h3 className="text-xl font-semibold mb-2">GenAI executes mundane tasks</h3>
            <p className="muted">Orchestrate agents, focus on higher-level problem solving.</p>
          </div>
        </div>
        <div className="panel">
          <div className="max-w-4xl w-[90vw] rounded-all border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8">
            <h3 className="text-xl font-semibold mb-2">Skills mapping</h3>
            <p className="muted">Track proficiency, prepare for interviews, learn the latest skills.</p>
          </div>
        </div>
        <div className="panel">
          <div className="max-w-4xl w-[90vw] rounded-all border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8">
            <h3 className="text-xl font-semibold mb-2">AI platform</h3>
            <p className="muted">Build your AI platform team and scale smarter.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

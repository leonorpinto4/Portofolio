import { useEffect, useRef } from "react"
import { sobre } from "./sobre"

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".reveal")
    if (!items) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.15 },
    )
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [])

  return (
    <section className="about" id="sobre" ref={ref}>
      <span className="about__eyebrow reveal">SOBRE MIM</span>

      <div className="about__grid">
        <div className="about__main">
          <h2 className="reveal">
            Engenheira de Software, a terminar o <em>mestrado</em>.
          </h2>
          <p className="about__degree reveal" style={{ "--i": 1 } as React.CSSProperties}>
            {sobre.degree} · {sobre.university}
          </p>
          <p className="about__intro reveal" style={{ "--i": 2 } as React.CSSProperties}>
            {sobre.intro}
          </p>

          <ul className="about__skills reveal" style={{ "--i": 3 } as React.CSSProperties}>
            {sobre.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <aside className="about__side">
          <article className="thesis reveal" style={{ "--i": 1 } as React.CSSProperties}>
            <span className="thesis__label">
              Dissertação <i>{sobre.thesis.status}</i>
            </span>
            <h3>{sobre.thesis.title}</h3>
            <p>{sobre.thesis.summary}</p>
            {"supervisor" in sobre.thesis && (
              <span className="thesis__meta">{String(sobre.thesis.supervisor)}</span>
            )}
          </article>

          <ol className="path reveal" style={{ "--i": 2 } as React.CSSProperties}>
            {sobre.path.map((step) => (
              <li key={step.title}>
                <span className="path__period">{step.period}</span>
                <strong>{step.title}</strong>
                <span className="path__place">{step.place}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}

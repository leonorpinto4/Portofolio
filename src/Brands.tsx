import { useEffect, useRef, useState } from "react"
import { brands, type Brand } from "./projects"

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("")

const canHover = () => window.matchMedia("(hover: hover)").matches

function Postcard({ brand, index }: { brand: Brand; index: number }) {
  const [flipped, setFlipped] = useState(false)

  // em ecrãs táteis vira com um toque; com rato vira ao passar por cima (CSS)
  const toggle = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) return
    if (!canHover()) setFlipped((f) => !f)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setFlipped((f) => !f)
    }
  }

  return (
    <article
      className={`postcard reveal ${flipped ? "is-flipped" : ""}`}
      style={{
        "--brand": brand.color,
        "--brand-foreground": brand.foreground ?? "#fffdf8",
        "--brand-link": brand.linkColor ?? brand.color,
        "--i": index,
      } as React.CSSProperties}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`${brand.name}: ver detalhes`}
      onClick={toggle}
      onKeyDown={onKey}
    >
      <div className="postcard__inner">
        {/* frente */}
        <div className="postcard__face postcard__front">
          <div className="postcard__art">
            {brand.logo ? (
              <img src={brand.logo} alt={`Logótipo ${brand.name}`} />
            ) : (
              <span className="postcard__mono" aria-hidden="true">
                {initials(brand.name)}
              </span>
            )}
            {brand.status && (
              <span className="postcard__postmark" aria-hidden="true">
                <span>{brand.status}</span>
                <span>2026</span>
              </span>
            )}
          </div>
          <div className="postcard__caption">
            <span className="postcard__greeting">saudações de</span>
            <h3>{brand.name}</h3>
          </div>
        </div>

        {/* verso */}
        <div className="postcard__face postcard__back">
          <p className="postcard__message">{brand.description}</p>

          <div className="postcard__address">
            <div className="postcard__stamp">
              {brand.logo ? (
                <img src={brand.logo} alt={`Logótipo ${brand.name}`} />
              ) : (
                <span aria-hidden="true">{initials(brand.name)}</span>
              )}
            </div>
            <ul>
              <li>{brand.name}</li>
              <li>{brand.work}</li>
              <li>
                {brand.site ? (
                  <a href={brand.site} target="_blank" rel="noreferrer">
                    visitar site ↗
                  </a>
                ) : (
                  <span className="postcard__soon">site em breve</span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Brands() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".reveal")
    if (!items) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.2 },
    )
    items.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <section className="brands" id="projetos" ref={sectionRef}>
      <header className="brands__header reveal">
        <span className="brands__eyebrow">PROJETOS</span>
        <h2>
          marcas com quem <em>trabalhei</em>
        </h2>
        <p className="brands__hint">passa o rato ou toca num postal para o virar</p>
      </header>

      <div className="brands__grid">
        {brands.map((brand, i) => (
          <Postcard key={brand.name} brand={brand} index={i} />
        ))}
      </div>
    </section>
  )
}

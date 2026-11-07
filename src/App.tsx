import { useEffect, useRef } from "react"
import About from "./About"
import Brands from "./Brands"
import Contact from "./Contact"

const interests = [
  {
    label: "música",
    className: "interest interest--turntable",
    image: "/images/hero-turntable.png",
    speed: 0.9,
  },
  {
    label: "música",
    className: "interest interest--music-quote",
    image: "/images/hero-music-quote.png",
    speed: -0.75,
  },
  {
    label: "flores",
    className: "interest interest--flowers",
    image: "/images/hero-flowers.png",
    speed: 0.6,
  },
  {
    label: "mar",
    className: "interest interest--wave",
    image: "/images/hero-wave.png",
    speed: -0.7,
  },
  {
    label: "leituras",
    className: "interest interest--reading",
    image: "/images/hero-reading.png",
    speed: 0.8,
  },
  {
    label: "livros",
    className: "interest interest--books",
    image: "/images/hero-books.png",
    speed: -0.6,
  },
]

export default function App() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return

    let frame = 0
    const updatePosition = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2
        const y = (event.clientY / window.innerHeight - 0.5) * 2
        hero.style.setProperty("--mouse-x", x.toFixed(3))
        hero.style.setProperty("--mouse-y", y.toFixed(3))
      })
    }

    window.addEventListener("pointermove", updatePosition)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", updatePosition)
    }
  }, [])

  return (
    <main>
      <section className="hero" id="inicio" ref={heroRef}>
        <header className="nav">
          <a className="nav__mark" href="#inicio" aria-label="Voltar ao início">
            lp.
          </a>
          <div className="nav__links">
            <a href="#sobre">sobre</a>
            <a href="#projetos">projetos</a>
            <a href="#contacto">contacto</a>
            <span className="nav__edition">Leonor Pinto · 2026</span>
          </div>
        </header>

        <div className="hero__eyebrow">
          <span>PORTFÓLIO</span>
          <span>2026</span>
        </div>

        <div
          className="hero__title"
          aria-label="O meu portfólio, por Leonor Pinto"
        >
          <span className="hero__the">o meu</span>
          <h1>portfólio</h1>
          <span className="hero__by">by Leonor Pinto</span>
        </div>

        <p className="hero__intro">
          Um pequeno universo de ideias,
          <br />
          imagens e histórias.
        </p>

        <div className="collage" aria-label="Os meus interesses">
          {interests.map((interest) => (
            <figure
              className={interest.className}
              key={interest.label}
              style={{ "--speed": interest.speed } as React.CSSProperties}
            >
              <img src={interest.image} alt="" />
              <figcaption>{interest.label}</figcaption>
            </figure>
          ))}

        </div>

        <span className="hero__note">mexe o rato</span>
      </section>

      <About />
      <Brands />
      <Contact />
    </main>
  )
}

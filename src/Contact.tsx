import { Fragment, useEffect, useRef } from "react"
import { contact } from "./contactos"

// *palavra* aparece em itálico serifado
const statement = "Gosto de criar coisas com *cuidado*, atenta a cada detalhe e à alma de cada lugar."

export default function Contact() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add("is-in"),
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const words = statement.split(" ")

  return (
    <section className="contact" id="contacto" ref={ref}>
      <p className="contact__hello">olá, sou a Leonor</p>

      <h2 className="contact__statement" aria-label={statement.replace(/\*/g, "")}>
        {words.map((word, i) => {
          const italic = word.startsWith("*")
          const clean = word.replace(/\*/g, "")
          return (
            <Fragment key={i}>
              <span className="word" aria-hidden="true">
                <span style={{ "--w": i } as React.CSSProperties} className={italic ? "is-italic" : ""}>
                  {clean}
                </span>
              </span>{" "}
            </Fragment>
          )
        })}
      </h2>

      <div className="contact__footer">
        <p>
          Entre código, imagens e pessoas, procuro dar forma a projetos que se sentem
          humanos e ficam na memória.
        </p>
        {contact.whatsapp && (
          <a
            className="contact__cta"
            href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>

      <ul className="contact__links">
        <li>
          <a href={`mailto:${contact.email}`}>
            <span>email</span>
            <small>{contact.email}</small>
          </a>
        </li>
        <li>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            <span>linkedin</span>
            <small>ver perfil</small>
          </a>
        </li>
        <li>
          <a href={contact.cv} target="_blank" rel="noreferrer">
            <span>currículo</span>
            <small>descarregar CV</small>
          </a>
        </li>
      </ul>

    </section>
  )
}

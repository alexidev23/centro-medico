"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "cn"

type Question = {
  question: string
  answer: string
}

const QUESTIONS: Question[] = [
  {
    question: "¿Cómo confirmo o cancelo mi turno si surge un imprevisto?",
    answer:
      "Podés gestionar o cancelar tu turno respondiendo directamente al mensaje de WhatsApp de recordatorio o ingresando al enlace que te enviamos por correo. Te solicitamos avisar con al menos 4 horas de anticipación para ceder el turno a otro paciente en espera.",
  },
  {
    question: "¿Qué documentación necesito presentar en la primera consulta?",
    answer:
      "Únicamente es necesario tu DNI físico o digital y, en caso de atenderte por cobertura médica, la credencial vigente (física o desde la app oficial de tu prepaga/obra social).",
  },
  {
    question: "¿Aceptan mi obra social o plan de prepaga?",
    answer:
      "Atendemos OSDE, Swiss Medical, APROSS y Particular. Para consultas particulares emitimos factura para su posterior reintegro según las condiciones de tu plan médico.",
  },
  {
    question: "¿Cuánto dura una consulta promedio y qué pasa si llego demorado?",
    answer:
      "Las consultas se programan con un margen de 20 a 30 minutos según la especialidad, garantizando tiempo de escucha y revisión sin prisas. Si sabés que vas a llegar con demora, avisanos por WhatsApp al +54 351 522-8900 para coordinar con recepción y mantener tu atención.",
  },
]

function Faq() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggle = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    )
  }

  return (
    <section id="preguntas-frecuentes" className="w-full py-lg md:py-xl">
      <div className="mx-auto w-full max-w-page px-gutter-mobile md:px-gutter">
        <div className="mx-auto flex w-full max-w-[48rem] flex-col gap-lg">
          <div className="flex flex-col items-center gap-xs text-center">
            <span className="text-label-sm font-semibold tracking-wider text-primary uppercase">
              Resolvé tus dudas
            </span>
            <h2 className="text-title-md font-bold tracking-tight text-foreground md:text-headline-lg">
              Preguntas frecuentes
            </h2>
            <p className="text-body-sm text-fg-secondary md:text-body-md">
              Todo lo que necesitás saber antes de acercarte a tu cita médica.
            </p>
          </div>
          <div className="flex flex-col gap-sm">
            {QUESTIONS.map((item, index) => {
              const isOpen = openItems.includes(index)
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-xl bg-card shadow-card"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-sm p-md text-left text-title-md text-foreground transition-colors hover:text-primary"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "size-6 shrink-0 text-primary transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    hidden={!isOpen}
                    className="px-md pb-md text-body-sm text-fg-secondary md:text-body-md"
                  >
                    {item.answer}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Faq }

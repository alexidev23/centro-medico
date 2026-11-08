import type { LucideIcon } from "lucide-react"
import { CalendarDays, MailCheck, UserRoundSearch } from "lucide-react"

type Step = {
  number: string
  title: string
  description: string
  Icon: LucideIcon
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Elegí especialidad o médico",
    description:
      "Filtrá según tu preferencia o necesidad en Nueva Córdoba entre nuestras 6 especialidades dedicadas.",
    Icon: UserRoundSearch,
  },
  {
    number: "02",
    title: "Seleccioná fecha y horario",
    description:
      "Mirá los turnos disponibles en tiempo real y elegí el más conveniente para tu rutina.",
    Icon: CalendarDays,
  },
  {
    number: "03",
    title: "Confirmá sin pago anticipado",
    description:
      "Te llega un recordatorio con la confirmación directo por WhatsApp o correo electrónico de forma instantánea.",
    Icon: MailCheck,
  },
]

function StepCard({ number, title, description, Icon }: Step) {
  return (
    <article className="flex flex-col gap-sm rounded-lg bg-card p-md shadow-card md:p-lg">
      <div className="flex items-center justify-between gap-sm">
        <span
          className="text-headline-lg-mobile font-bold text-primary/40 md:text-display"
          aria-hidden="true"
        >
          {number}
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <h3 className="text-title-md font-bold text-foreground md:text-headline-sm">
        {title}
      </h3>
      <p className="text-body-sm text-fg-secondary md:text-body-md">
        {description}
      </p>
    </article>
  )
}

function BookingSteps() {
  return (
    <section className="w-full py-lg md:py-xl">
      <div className="mx-auto w-full max-w-page px-gutter-mobile md:px-gutter">
        <div className="flex flex-col gap-lg rounded-lg bg-surface-subtle p-lg shadow-card md:gap-xl md:p-xl">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-xs text-center">
            <span className="text-label-sm font-semibold tracking-wider text-primary uppercase">
              Gestión ágil
            </span>
            <h2 className="text-title-md font-bold tracking-tight text-foreground md:text-headline-lg">
              Cómo sacar tu turno en 3 simples pasos
            </h2>
            <p className="text-body-sm text-fg-secondary md:text-body-md">
              Olvidate de esperas telefónicas. Elegí el horario más adecuado
              para tu día a día.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-sm md:grid-cols-3 md:gap-lg">
            {STEPS.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { BookingSteps }

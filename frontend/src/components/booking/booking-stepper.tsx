import { BadgeCheck, Check, ClipboardCheck } from "lucide-react"
import { cn } from "cn"

const STEPS = [
  { title: "Especialidad y Profesional", short: "Especialidad" },
  { title: "Fecha y Horario", short: "Fecha y horario" },
  { title: "Datos del Paciente", short: "Tus datos" },
  { title: "Confirmación", short: "Confirmación" },
]

type BookingStepperProps = {
  current: number
}

function BookingStepper({ current }: BookingStepperProps) {
  const percent = Math.round((current / STEPS.length) * 100)

  return (
    <div className="w-full rounded-xl bg-card p-md shadow-card md:p-lg">
      <div className="mb-md flex flex-col gap-sm md:hidden">
        <div className="flex items-center justify-between gap-sm text-label-sm text-fg-secondary">
          <span className="flex min-w-0 items-center gap-xs font-semibold text-primary">
            <ClipboardCheck className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">
              Paso {current} de {STEPS.length}: {STEPS[current - 1].short}
            </span>
          </span>
          <span className="shrink-0">
            {percent}%<span className="hidden sm:inline"> completado</span>
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Progreso de la reserva"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 w-full overflow-hidden rounded-full bg-surface-subtle"
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="mb-md flex flex-col gap-md md:flex-row md:items-center md:justify-between">
        <div>
          <span className="mb-xs block text-label-sm font-semibold tracking-widest text-primary uppercase">
            Reserva Online · Sede Nueva Córdoba
          </span>
          <h1 className="text-headline-md text-foreground">
            Sacá tu turno con nuestros especialistas
          </h1>
        </div>
        <div className="flex items-center gap-xs self-start rounded-full bg-surface-subtle px-md py-xs md:self-auto">
          <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
          <span className="text-label-sm text-fg-secondary">
            Turnos en tiempo real · Confirmación inmediata
          </span>
        </div>
      </div>

      <ol className="hidden grid-cols-4 gap-sm pt-xs md:grid">
        {STEPS.map(({ title }, index) => {
          const step = index + 1
          const isDone = step < current
          const isCurrent = step === current

          return (
            <li
              key={title}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex items-center gap-sm rounded-xl p-sm",
                isDone && "bg-surface-subtle/60",
                isCurrent && "bg-primary text-primary-foreground shadow-card",
                !isDone && !isCurrent && "bg-surface-subtle/40 text-fg-secondary opacity-70"
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-label-md font-semibold",
                  isDone && "bg-primary text-primary-foreground",
                  isCurrent && "bg-primary-foreground font-bold text-primary",
                  !isDone && !isCurrent && "bg-surface-subtle text-fg-secondary"
                )}
              >
                {isDone ? <Check className="size-4" aria-hidden="true" /> : step}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block truncate text-[11px] tracking-wider uppercase",
                    isDone && "text-primary",
                    isCurrent && "text-primary-foreground/80"
                  )}
                >
                  {isCurrent ? `Paso ${step} · En curso` : `Paso ${step}`}
                </span>
                <span
                  className={cn(
                    "block truncate text-label-md",
                    isCurrent && "font-bold"
                  )}
                >
                  {title}
                </span>
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export { BookingStepper }

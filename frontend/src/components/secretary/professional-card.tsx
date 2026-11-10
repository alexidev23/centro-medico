import { CalendarDays, DoorOpen } from "lucide-react"
import type {
  EstadoDelProfesional,
  ProfesionalDelCuerpo,
} from "@/lib/secretary/demo-data"
import { initials } from "@/lib/utils"

const estados: Record<
  EstadoDelProfesional,
  { label: string; pill: string; dot: string }
> = {
  "en-sala": {
    label: "Con paciente en sala",
    pill: "bg-primary-light text-primary-dark",
    dot: "bg-primary",
  },
  "con-turnos": {
    label: "Con turnos hoy",
    pill: "bg-status-confirmed-bg text-status-confirmed-text",
    dot: "bg-status-confirmed",
  },
  "sin-turnos": {
    label: "Sin turnos hoy",
    pill: "bg-surface-subtle text-fg-secondary",
    dot: "bg-fg-secondary",
  },
}

/** Titles are not part of a person's initials. */
function inicialesDelProfesional(nombre: string) {
  return initials(nombre.replace(/^(Dra?\.|Lic\.)\s+/, ""))
}

function ProfessionalCard({
  profesional,
}: {
  profesional: ProfesionalDelCuerpo
}) {
  const { label, pill, dot } = estados[profesional.estado]

  return (
    <article className="flex flex-col gap-sm rounded-xl border border-surface-subtle bg-card p-md shadow-card">
      <div className="flex items-start justify-between gap-sm">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-title-md font-bold text-primary">
          {inicialesDelProfesional(profesional.nombre)}
        </span>
        {/* Hand-concatenated: cn() would drop text-label-sm, reading it as a colour. */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm ${pill}`}
        >
          <span className={`size-2 rounded-full ${dot}`} aria-hidden="true" />
          {label}
        </span>
      </div>

      <div className="flex flex-col">
        <h2 className="text-title-md font-bold tracking-tight text-foreground">
          {profesional.nombre}
        </h2>
        <p className="text-label-sm text-fg-secondary">
          M.P. {profesional.matricula}
        </p>
        <span className="mt-1 text-label-md font-semibold text-primary">
          {profesional.especialidad}
        </span>
      </div>

      <div className="flex flex-col gap-1 border-t border-surface-subtle pt-sm text-body-sm text-fg-secondary">
        <p className="flex items-center gap-1.5">
          <DoorOpen className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="min-w-0 truncate">{profesional.dondeAtiende}</span>
          <span className="ml-auto shrink-0 text-label-sm font-semibold text-foreground">
            {profesional.duracion} min
          </span>
        </p>
        <p className="flex items-center gap-1.5">
          <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="min-w-0">{profesional.dias}</span>
        </p>
        <p className="pl-6 text-label-sm">{profesional.franja}</p>
      </div>
    </article>
  )
}

export { ProfessionalCard }

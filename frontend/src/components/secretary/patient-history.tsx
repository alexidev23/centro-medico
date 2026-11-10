import { BellRing, MapPin } from "lucide-react"
import { StatusBadge } from "@/components/secretary/status-badge"
import type { ProximoTurno } from "@/lib/secretary/demo-data"

function PatientHistory({ proximo }: { proximo: ProximoTurno | null }) {
  if (proximo === null) {
    return (
      <p className="rounded-xl border border-surface-subtle bg-card p-md text-body-sm text-fg-secondary">
        Este paciente no tiene turnos agendados.
      </p>
    )
  }

  return (
    <article className="flex flex-col gap-sm rounded-xl bg-surface-subtle p-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-label-sm font-bold tracking-wider text-primary uppercase">
          <BellRing className="size-4" aria-hidden="true" />
          Próximo turno
        </span>
        <StatusBadge estado={proximo.estado} />
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-md gap-y-1">
        <div>
          <h3 className="text-headline-sm font-bold text-primary">
            {proximo.dia}
          </h3>
          <span className="text-title-md font-semibold text-foreground">
            {proximo.hora}
          </span>
        </div>
        <div className="text-right">
          <span className="block text-label-lg font-semibold text-foreground">
            {proximo.profesional}
          </span>
          <span className="text-body-sm text-fg-secondary">
            {proximo.especialidad}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-md gap-y-1 border-t border-surface-subtle pt-sm text-body-sm text-fg-secondary">
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
          {proximo.consultorio}
        </span>
        <span className="text-label-sm font-semibold text-primary">
          Motivo: {proximo.motivo}
        </span>
      </div>
    </article>
  )
}

export { PatientHistory }

import { StatusBadge } from "@/components/secretary/status-badge"
import type { PacienteDelPadron } from "@/lib/secretary/demo-data"

function PatientWeek({ paciente }: { paciente: PacienteDelPadron }) {
  const { proximo, semana } = paciente
  // A patient with nothing scheduled this week gets the card's own message.
  if (semana.length === 0) return null

  // The card already shows one of these turnos, so the list carries the others.
  // Id and date together: the fixtures repeat weekly, so the id alone is shared
  // by this week's turno and the same one a week later.
  const otros = semana.filter(
    (turno) => turno.id !== proximo?.id || turno.fecha !== proximo?.fecha,
  )

  return (
    <div className="flex flex-col gap-sm">
      <h3 className="text-label-sm font-bold tracking-wider text-fg-secondary uppercase">
        Turnos de la semana
      </h3>

      {otros.length === 0 ? (
        <p className="text-body-sm text-fg-secondary">
          No hay otros turnos esta semana.
        </p>
      ) : (
        <ul className="flex flex-col">
          {otros.map((turno) => (
            <li
              key={turno.id}
              className="flex flex-wrap items-center justify-between gap-x-sm gap-y-1 border-b border-surface-subtle py-sm last:border-b-0"
            >
              <div className="flex min-w-0 flex-col">
                <span className="text-label-lg font-semibold text-foreground">
                  {turno.cuando}
                </span>
                <span className="text-body-sm text-fg-secondary">
                  {turno.especialidad} · {turno.motivo}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-sm">
                <span className="text-label-sm font-medium text-foreground">
                  {turno.profesional}
                </span>
                <StatusBadge estado={turno.estado} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { PatientWeek }

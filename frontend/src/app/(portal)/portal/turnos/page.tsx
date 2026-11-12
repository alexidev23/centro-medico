import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { DemoNote } from "@/components/portal/demo-note"
import { StatusBadge } from "@/components/secretary/status-badge"
import { pacienteActual } from "@/lib/portal/sesion"
import {
  turnosDelPaciente,
  type TurnoDelPaciente,
} from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Tus turnos · Centro Médico Aurora",
}

// The page depends on the session cookie, so there is no shell to prerender.
export const instant = false

function Lista({ turnos }: { turnos: TurnoDelPaciente[] }) {
  return (
    <ul className="flex flex-col">
      {turnos.map((turno) => (
        <li
          key={`${turno.id}-${turno.fecha}`}
          className="flex flex-wrap items-start justify-between gap-x-sm gap-y-2 border-b border-surface-subtle py-sm last:border-b-0"
        >
          <div className="flex min-w-0 flex-col">
            <span className="text-label-lg font-semibold text-foreground">
              {turno.cuando}
            </span>
            <span className="text-body-sm text-fg-secondary">
              {turno.profesional} · {turno.especialidad} · {turno.consultorio}
            </span>
            <span className="text-body-sm text-fg-secondary">{turno.motivo}</span>
          </div>
          <StatusBadge estado={turno.estado} />
        </li>
      ))}
    </ul>
  )
}

export default async function TurnosPage() {
  const paciente = await pacienteActual()
  if (!paciente) redirect("/portal/ingreso")

  const turnos = turnosDelPaciente(paciente.id, new Date())
  const proximos = turnos.filter((turno) => !turno.fue)
  // The most recent first: that is what a patient looks for.
  const historial = turnos.filter((turno) => turno.fue).reverse()

  return (
    <>
      <h1 className="text-headline-md font-bold tracking-tight text-foreground">
        Tus turnos
      </h1>
      <p className="mt-1 max-w-[42rem] text-body-md leading-snug text-fg-secondary">
        Los que tenés agendados y los que ya pasaron.
      </p>

      <section
        aria-label="Próximos turnos"
        className="mt-lg rounded-xl border border-surface-subtle bg-card p-md shadow-card"
      >
        <h2 className="text-title-md font-semibold tracking-tight text-foreground">
          Próximos turnos
        </h2>
        {proximos.length > 0 ? (
          <div className="mt-sm">
            <Lista turnos={proximos} />
          </div>
        ) : (
          <p className="mt-sm text-body-md text-fg-secondary">
            No tenés turnos agendados.
          </p>
        )}
      </section>

      {historial.length > 0 ? (
        <section
          aria-label="Historial de turnos"
          className="mt-md rounded-xl border border-surface-subtle bg-card p-md shadow-card"
        >
          <h2 className="text-title-md font-semibold tracking-tight text-foreground">
            Historial de turnos
          </h2>
          <p className="mt-1 text-body-sm text-fg-secondary">
            Los turnos que ya pasaron. El historial cubre una semana de prueba.
          </p>
          <div className="mt-sm">
            <Lista turnos={historial} />
          </div>
        </section>
      ) : null}

      <DemoNote />
    </>
  )
}

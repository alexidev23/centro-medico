import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { StatusBadge } from "@/components/secretary/status-badge"
import { pacienteActual } from "@/lib/portal/sesion"
import {
  coberturaDe,
  turnosDelPaciente,
  type TurnoDelPaciente,
} from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Mi portal · Centro Médico Aurora",
}

// The whole page depends on the session cookie, so there is no shell to
// prerender: the request blocks until the patient is known and redirected.
export const instant = false

function ListaDeTurnos({ turnos }: { turnos: TurnoDelPaciente[] }) {
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

export default async function PortalPage() {
  const paciente = await pacienteActual()
  if (!paciente) redirect("/portal/ingreso")

  const turnos = turnosDelPaciente(paciente.id, new Date())
  const proximos = turnos.filter((turno) => !turno.fue)
  const proximo = proximos[0] ?? null
  const otros = proximos.slice(1)
  // The most recent first: that is what a patient looks for.
  const historial = turnos.filter((turno) => turno.fue).reverse()

  const datos = [
    { label: "Nombre", value: paciente.nombre },
    { label: "Documento", value: paciente.documento },
    { label: "Cobertura", value: coberturaDe(paciente) },
    { label: "Email", value: paciente.email },
  ]

  return (
    <>
      <p className="text-label-sm font-semibold tracking-wide text-fg-secondary uppercase">
        Mi portal
      </p>
      <h1 className="mt-1 text-headline-lg font-bold tracking-tight text-foreground">
        Hola, {paciente.nombre.split(" ")[0]}
      </h1>
      <p className="mt-1 max-w-[42rem] text-body-md leading-snug text-fg-secondary">
        Acá vas a encontrar tus turnos, tus recetas y tu facturación.
      </p>

      <div className="mt-lg grid gap-md lg:grid-cols-[1fr_1.3fr]">
        <section
          aria-label="Tus datos"
          className="rounded-xl border border-surface-subtle bg-card p-md shadow-card"
        >
          <h2 className="text-title-md font-semibold tracking-tight text-foreground">
            Tus datos
          </h2>
          <dl className="mt-sm flex flex-col gap-2">
            {datos.map((dato) => (
              <div key={dato.label} className="flex flex-col">
                <dt className="text-label-sm text-fg-secondary">{dato.label}</dt>
                <dd className="text-body-md break-words text-foreground">{dato.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          aria-label="Tu próximo turno"
          className="rounded-xl border border-surface-subtle bg-card p-md shadow-card"
        >
          <div className="flex flex-wrap items-center justify-between gap-sm">
            <h2 className="text-title-md font-semibold tracking-tight text-foreground">
              Tu próximo turno
            </h2>
            {proximo ? <StatusBadge estado={proximo.estado} /> : null}
          </div>
          {proximo ? (
            <>
              <p className="mt-sm text-title-md font-semibold text-foreground">
                {proximo.dia}
              </p>
              <p className="text-body-md text-fg-secondary">
                {proximo.hora} · {proximo.profesional}
              </p>
              <p className="mt-2 text-body-sm text-fg-secondary">
                {proximo.especialidad} · {proximo.consultorio} · {proximo.motivo}
              </p>
            </>
          ) : (
            <p className="mt-sm text-body-md text-fg-secondary">
              No tenés turnos agendados.
            </p>
          )}
        </section>
      </div>

      {otros.length > 0 ? (
        <section
          aria-label="Otros próximos turnos"
          className="mt-md rounded-xl border border-surface-subtle bg-card p-md shadow-card"
        >
          <h2 className="text-title-md font-semibold tracking-tight text-foreground">
            También tenés
          </h2>
          <div className="mt-sm">
            <ListaDeTurnos turnos={otros} />
          </div>
        </section>
      ) : null}

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
            <ListaDeTurnos turnos={historial} />
          </div>
        </section>
      ) : null}

      <p className="mt-md rounded-lg bg-surface-subtle p-sm text-body-sm leading-snug text-fg-secondary">
        Modo demo: los datos son de prueba y todavía no hay backend que los
        actualice.
      </p>
    </>
  )
}

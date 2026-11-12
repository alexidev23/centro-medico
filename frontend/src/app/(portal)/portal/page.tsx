import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { DemoNote } from "@/components/portal/demo-note"
import { StatusBadge } from "@/components/secretary/status-badge"
import { pacienteActual } from "@/lib/portal/sesion"
import {
  coberturaDe,
  facturacionDelPaciente,
  pesos,
  recetasDelPaciente,
  turnosDelPaciente,
} from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Mi portal · Centro Médico Aurora",
}

// The whole page depends on the session cookie, so there is no shell to
// prerender: the request blocks until the patient is known and redirected.
export const instant = false

export default async function PortalPage() {
  const paciente = await pacienteActual()
  if (!paciente) redirect("/portal/ingreso")

  const hoy = new Date()
  const turnos = turnosDelPaciente(paciente.id, hoy)
  const proximo = turnos.find((turno) => !turno.fue) ?? null
  const recetas = recetasDelPaciente(paciente.id, hoy)
  const facturacion = facturacionDelPaciente(paciente.id, hoy)

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
          <Link
            href="/portal/turnos"
            className="mt-sm inline-flex text-label-md text-primary underline-offset-4 hover:underline"
          >
            Ver todos tus turnos
          </Link>
        </section>
      </div>

      {recetas.length > 0 ? (
        <section
          aria-label="Tus recetas"
          className="mt-md rounded-xl border border-surface-subtle bg-card p-md shadow-card"
        >
          <h2 className="text-title-md font-semibold tracking-tight text-foreground">
            Tus recetas
          </h2>
          <p className="mt-1 text-body-sm text-fg-secondary">
            Emitidas en la demo: no tienen validez médica.
          </p>
          <ul className="mt-sm flex flex-col gap-sm">
            {recetas.map((receta) => (
              <li
                key={receta.id}
                className="rounded-lg border border-surface-subtle p-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-sm gap-y-1">
                  <span className="text-label-lg font-semibold text-foreground">
                    {receta.cuando}
                  </span>
                  <span className="text-label-sm text-fg-secondary">
                    {receta.matricula}
                  </span>
                </div>
                <p className="text-body-sm text-fg-secondary">
                  {receta.profesional} · {receta.especialidad} · {receta.motivo}
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {receta.medicamentos.map((medicamento) => (
                    <li key={medicamento.nombre} className="text-body-sm">
                      <span className="font-semibold text-foreground">
                        {medicamento.nombre}
                      </span>
                      <span className="text-fg-secondary">
                        {" — "}
                        {medicamento.indicacion}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-body-sm text-fg-secondary">
                  {receta.indicaciones}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {facturacion.length > 0 ? (
        <section
          aria-label="Facturación"
          className="mt-md rounded-xl border border-surface-subtle bg-card p-md shadow-card"
        >
          <h2 className="text-title-md font-semibold tracking-tight text-foreground">
            Facturación
          </h2>
          <p className="mt-1 text-body-sm text-fg-secondary">
            Montos de demo: no son importes reales ni un comprobante de pago.
          </p>
          <div className="mt-sm flex flex-col gap-md">
            {facturacion.map((mes) => (
              <div key={mes.clave}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-sm gap-y-1">
                  <h3 className="text-label-lg font-semibold text-foreground">
                    {mes.mes}
                  </h3>
                  <span className="text-body-sm text-fg-secondary">
                    {mes.turnos.length === 1
                      ? "1 consulta"
                      : `${mes.turnos.length} consultas`}
                  </span>
                </div>
                <ul className="mt-1 flex flex-col">
                  {mes.turnos.map((turno) => (
                    <li
                      key={turno.id}
                      className="flex flex-wrap items-start justify-between gap-x-sm gap-y-1 border-b border-surface-subtle py-sm last:border-b-0"
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="text-label-md text-foreground">
                          {turno.cuando}
                        </span>
                        <span className="text-body-sm text-fg-secondary">
                          {turno.profesional} · {turno.especialidad} · {turno.motivo}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-label-md text-foreground">
                          {pesos(turno.aCargo)} a cargo
                        </span>
                        {turno.cubierto > 0 ? (
                          <span className="text-body-sm text-fg-secondary">
                            {pesos(turno.cubierto)} cubierto
                          </span>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 rounded-lg bg-surface-subtle p-sm">
                  <p className="text-label-md font-semibold text-foreground">
                    Total del mes: {pesos(mes.aCargo)} a cargo
                  </p>
                  <p className="text-body-sm text-fg-secondary">
                    {mes.cobertura
                      ? `Cubierto por ${mes.cobertura}: ${pesos(mes.cubierto)}`
                      : "Sin cobertura: el honorario completo queda a tu cargo."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <DemoNote />
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { DemoNote } from "@/components/portal/demo-note"
import { StatusBadge } from "@/components/secretary/status-badge"
import { pacienteActual } from "@/lib/portal/sesion"
import {
  cancelacionesCercanas,
  facturacionDelPaciente,
  pesos,
  turnosDelPaciente,
  vencimientoDe,
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

  // `new Date()` is an unstable value: the docs require an explicit request
  // boundary with cacheComponents, cookies() alone is not enough.
  await connection()

  const hoy = new Date()
  const turnos = turnosDelPaciente(paciente.id, hoy)
  const proximo = turnos.find((turno) => !turno.fue) ?? null
  const [mesAPagar] = facturacionDelPaciente(paciente.id, hoy)
  const cancelaciones = cancelacionesCercanas(paciente.id, hoy)

  return (
    <>
      <p className="text-label-sm font-semibold tracking-wide text-fg-secondary uppercase">
        Mi portal
      </p>
      <h1 className="mt-1 text-headline-lg font-bold tracking-tight text-foreground">
        Hola, {paciente.nombre.split(" ")[0]}
      </h1>
      <p className="mt-1 max-w-[42rem] text-body-md leading-snug text-fg-secondary">
        Acá ves las novedades: tu próximo turno, lo que tenés que pagar y los
        turnos que se cancelaron.
      </p>

      <div className="mt-lg flex flex-col gap-md">
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

        <section
          aria-label="Cuota del mes"
          className="rounded-xl border border-surface-subtle bg-card p-md shadow-card"
        >
          <h2 className="text-title-md font-semibold tracking-tight text-foreground">
            Cuota del mes
          </h2>
          {mesAPagar ? (
            <>
              <p className="mt-sm text-body-md text-fg-secondary">
                {mesAPagar.mes}
              </p>
              <p className="text-title-md font-semibold text-foreground">
                {pesos(mesAPagar.aCargo)} a cargo
              </p>
              <p className="mt-2 text-body-sm text-fg-secondary">
                Vence el {vencimientoDe(mesAPagar.clave)}
              </p>
            </>
          ) : (
            <p className="mt-sm text-body-md text-fg-secondary">
              Todavía no tenés consumos para pagar: aparece acá después de tu
              primera consulta.
            </p>
          )}
          <Link
            href="/portal/facturacion"
            className="mt-sm inline-flex text-label-md text-primary underline-offset-4 hover:underline"
          >
            Ver el detalle
          </Link>
        </section>

        {cancelaciones.length > 0 ? (
          <section
            aria-label="Turnos cancelados"
            className="rounded-xl border border-surface-subtle bg-card p-md shadow-card"
          >
            <h2 className="text-title-md font-semibold tracking-tight text-foreground">
              Turnos cancelados
            </h2>
            <ul className="mt-sm flex flex-col">
              {cancelaciones.map((turno) => (
                <li
                  key={turno.id}
                  className="flex flex-col border-b border-surface-subtle py-sm last:border-b-0"
                >
                  <span className="text-label-md text-foreground">
                    {turno.cuando}
                  </span>
                  <span className="text-body-sm text-fg-secondary">
                    {turno.profesional} · {turno.especialidad} · {turno.motivo}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/#reservar-turno"
              className="mt-sm inline-flex text-label-md text-primary underline-offset-4 hover:underline"
            >
              Pedir un turno nuevo
            </Link>
          </section>
        ) : null}
      </div>

      <DemoNote />
    </>
  )
}

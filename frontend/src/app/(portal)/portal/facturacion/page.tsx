import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { DemoNote } from "@/components/portal/demo-note"
import { pacienteActual } from "@/lib/portal/sesion"
import { coberturaDe, facturacionDelPaciente, pesos } from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Tu cuenta · Centro Médico Aurora",
}

// The page depends on the session cookie, so there is no shell to prerender.
export const instant = false

export default async function FacturacionPage() {
  const paciente = await pacienteActual()
  if (!paciente) redirect("/portal/ingreso")

  const facturacion = facturacionDelPaciente(paciente.id, new Date())

  return (
    <>
      <h1 className="text-headline-md font-bold tracking-tight text-foreground">
        Tu cuenta
      </h1>
      <p className="mt-1 max-w-[42rem] text-body-md leading-snug text-fg-secondary">
        Tu cobertura es{" "}
        <span className="font-semibold text-foreground">{coberturaDe(paciente)}</span>
        . Acá ves lo que dejó cada consulta atendida. Montos de demo: no son
        importes reales ni un comprobante de pago.
      </p>

      {facturacion.length > 0 ? (
        <div className="mt-lg flex flex-col gap-md">
          {facturacion.map((mes) => (
            <section
              key={mes.clave}
              aria-label={`Facturación de ${mes.mes}`}
              className="rounded-xl border border-surface-subtle bg-card p-md shadow-card"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-sm gap-y-1">
                <h2 className="text-title-md font-semibold tracking-tight text-foreground">
                  {mes.mes}
                </h2>
                <span className="text-body-sm text-fg-secondary">
                  {mes.turnos.length === 1
                    ? "1 consulta"
                    : `${mes.turnos.length} consultas`}
                </span>
              </div>
              <ul className="mt-sm flex flex-col">
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
            </section>
          ))}
        </div>
      ) : (
        <p className="mt-lg rounded-xl border border-surface-subtle bg-card p-md text-body-md text-fg-secondary shadow-card">
          Todavía no hay consultas para facturar: el resumen aparece acá después
          de la primera.
        </p>
      )}

      <DemoNote />
    </>
  )
}

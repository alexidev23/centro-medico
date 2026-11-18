import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { DemoNote } from "@/components/portal/demo-note"
import { pacienteActual } from "@/lib/portal/sesion"
import { recetasDelPaciente } from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Tus recetas · Centro Médico Aurora",
}

// The page depends on the session cookie, so there is no shell to prerender.
export const instant = false

export default async function RecetasPage() {
  const paciente = await pacienteActual()
  if (!paciente) redirect("/portal/ingreso")

  // `new Date()` is an unstable value: the docs require an explicit request
  // boundary with cacheComponents, cookies() alone is not enough.
  await connection()

  const recetas = recetasDelPaciente(paciente.id, new Date())

  return (
    <>
      <h1 className="text-headline-md font-bold tracking-tight text-foreground">
        Tus recetas
      </h1>
      <p className="mt-1 max-w-[42rem] text-body-md leading-snug text-fg-secondary">
        Una por cada consulta atendida. Emitidas en la demo: no tienen validez
        médica.
      </p>

      {recetas.length > 0 ? (
        <ul className="mt-lg flex flex-col gap-sm">
          {recetas.map((receta) => (
            <li
              key={receta.id}
              className="rounded-xl border border-surface-subtle bg-card p-md shadow-card"
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
      ) : (
        <p className="mt-lg rounded-xl border border-surface-subtle bg-card p-md text-body-md text-fg-secondary shadow-card">
          Todavía no tenés recetas: aparecen acá cuando una consulta deja una.
        </p>
      )}

      <DemoNote />
    </>
  )
}

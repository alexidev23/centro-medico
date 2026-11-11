import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { LogOut } from "lucide-react"
import { salir } from "@/lib/portal/acciones"
import { pacienteActual } from "@/lib/portal/sesion"
import { coberturaDe } from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Mi portal · Centro Médico Aurora",
}

// The whole page depends on the session cookie, so there is no shell to
// prerender: the request blocks until the patient is known and redirected.
export const instant = false

export default async function PortalPage() {
  const paciente = await pacienteActual()
  if (!paciente) redirect("/portal/ingreso")

  return (
    <div className="mx-auto flex w-full max-w-[52rem] flex-1 flex-col px-gutter-mobile py-lg md:px-gutter">
      <div className="flex flex-wrap items-start justify-between gap-sm">
        <div>
          <p className="text-label-sm font-semibold tracking-wide text-fg-secondary uppercase">
            Mi portal
          </p>
          <h1 className="mt-1 text-headline-lg font-bold tracking-tight text-foreground">
            Hola, {paciente.nombre.split(" ")[0]}
          </h1>
        </div>
        <form action={salir}>
          <button
            type="submit"
            className="flex h-10 items-center gap-1.5 rounded-lg px-sm text-label-md text-fg-secondary transition-colors hover:bg-surface-subtle hover:text-foreground"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Salir
          </button>
        </form>
      </div>

      <p className="mt-sm max-w-[42rem] text-body-md leading-snug text-fg-secondary">
        Entraste como {paciente.nombre} · DNI {paciente.documento} ·{" "}
        {coberturaDe(paciente)}. Acá vas a encontrar tus turnos, tus recetas y
        tu facturación.
      </p>

      <p className="mt-md max-w-[42rem] rounded-lg bg-surface-subtle p-sm text-body-sm leading-snug text-fg-secondary">
        Modo demo: los datos son de prueba y todavía no hay backend que los
        actualice.
      </p>
    </div>
  )
}

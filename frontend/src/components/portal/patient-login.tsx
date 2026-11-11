import { ArrowRight, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { entrar } from "@/lib/portal/acciones"
import { pacientes } from "@/lib/secretary/demo-data"

function PatientLogin() {
  return (
    <div className="mx-auto flex w-full max-w-[30rem] flex-col rounded-xl bg-card px-md py-lg shadow-card md:px-lg md:py-xl">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-surface-subtle px-sm py-1 text-label-sm font-semibold text-primary">
        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
        Modo demo
      </span>

      <h1 className="mt-md text-headline-md font-bold tracking-tight text-foreground">
        Mi portal
      </h1>
      <p className="mt-1 text-body-md leading-snug text-fg-secondary">
        Entrá para ver tus turnos, tus recetas y tu facturación. En esta demo
        elegís con qué paciente de prueba entrar: no hay contraseña y no hay
        datos reales.
      </p>

      <form action={entrar} className="mt-lg flex flex-col gap-md">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pacienteId" className="text-label-lg text-foreground">
            Entrá como
          </label>
          <select
            id="pacienteId"
            name="pacienteId"
            required
            className="h-12 w-full min-w-0 rounded-lg bg-surface-subtle px-sm text-body-md text-foreground outline-none focus-visible:bg-card focus-visible:ring-[3px] focus-visible:ring-ring/15"
          >
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nombre} — DNI {paciente.documento}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="mt-1 w-full gap-xs">
          Entrar a mi portal
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </form>

      <p className="mt-md flex items-start gap-1.5 rounded-lg bg-surface-subtle p-sm text-body-sm leading-snug text-fg-secondary">
        <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        Los turnos salen de las mismas fichas que usa la secretaría. Recetas y
        facturación todavía no tienen datos.
      </p>
    </div>
  )
}

export { PatientLogin }

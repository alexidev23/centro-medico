import { Building2 } from "lucide-react"
import { consultorios, type Planta } from "@/lib/secretary/demo-data"

const plantas: Planta[] = ["Baja", "Alta"]

const punto: Record<Planta, string> = {
  Baja: "bg-primary",
  Alta: "bg-status-confirmed",
}

/** "Cons. 1, 2, 5" — the rooms of one floor, as the design lists them. */
function numerosDe(planta: Planta) {
  const numeros = consultorios
    .filter((consultorio) => consultorio.planta === planta)
    .map((consultorio) => consultorio.nombre.replace("Consultorio ", ""))

  return `Cons. ${numeros.join(", ")}`
}

function ConsultoriosDistribution() {
  return (
    <section
      aria-label="Distribución física de consultorios"
      className="flex flex-col gap-md rounded-xl border border-surface-subtle bg-card p-md shadow-card lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="flex items-center gap-md">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-primary">
          <Building2 className="size-6" aria-hidden="true" />
        </span>
        <div className="flex flex-col">
          <h2 className="text-title-md font-semibold tracking-tight text-foreground">
            Distribución física de consultorios
          </h2>
          <p className="text-body-sm text-fg-secondary">
            Sede Nueva Córdoba • {consultorios.length} consultorios equipados
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-md">
        {plantas.map((planta) => (
          <span key={planta} className="flex items-center gap-2">
            <span
              className={`size-3 shrink-0 rounded-full ${punto[planta]}`}
              aria-hidden="true"
            />
            <span className="text-label-sm text-fg-secondary">
              Planta {planta}: {numerosDe(planta)}
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}

export { ConsultoriosDistribution }

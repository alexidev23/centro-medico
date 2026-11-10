import { CalendarDays } from "lucide-react"
import {
  type DiaSemana,
  type FechaDeLaSemana,
} from "@/lib/secretary/demo-data"
import { cn } from "@/lib/utils"

const etiquetasDia: Record<DiaSemana, string> = {
  lun: "Lun",
  mar: "Mar",
  mie: "Mié",
  jue: "Jue",
  vie: "Vie",
  sab: "Sáb",
}

const horas = Array.from({ length: 10 }, (_, indice) =>
  `${String(8 + indice).padStart(2, "0")}:00`,
)

const mesFormatter = new Intl.DateTimeFormat("es-AR", { month: "long" })

const capitalizar = (texto: string) =>
  texto.charAt(0).toUpperCase() + texto.slice(1)

function semanaLabel(fechas: FechaDeLaSemana[]) {
  const primero = fechas[0].fecha
  const ultimo = fechas[fechas.length - 1].fecha
  const mesPrimero = capitalizar(mesFormatter.format(primero))
  const mesUltimo = capitalizar(mesFormatter.format(ultimo))
  const anio = ultimo.getFullYear()

  if (primero.getMonth() === ultimo.getMonth()) {
    return `${primero.getDate()} al ${ultimo.getDate()} de ${mesPrimero}, ${anio}`
  }

  return `${primero.getDate()} de ${mesPrimero} al ${ultimo.getDate()} de ${mesUltimo}, ${anio}`
}

function AgendaGrid({
  fechas,
  hoy,
}: {
  fechas: FechaDeLaSemana[]
  hoy: DiaSemana | null
}) {
  return (
    <section className="flex flex-col gap-lg">
      <div className="flex flex-wrap items-center justify-between gap-md">
        <div className="flex items-center gap-sm rounded-xl border border-surface-subtle bg-card px-md py-sm shadow-card">
          <CalendarDays className="size-5 shrink-0 text-primary" aria-hidden="true" />
          <h1 className="text-title-md font-semibold tracking-tight text-foreground">
            {semanaLabel(fechas)}
          </h1>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-surface-subtle px-sm py-1 text-label-sm text-fg-secondary">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          Modo demo
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-surface-subtle bg-card shadow-card">
        <div className="min-w-[44rem]">
          <div className="grid grid-cols-[64px_repeat(6,1fr)] bg-surface-subtle">
            <div className="p-sm text-center text-label-sm text-fg-secondary">
              Hora
            </div>
            {fechas.map(({ dia, fecha }) => (
              <div
                key={dia}
                className={cn(
                  "border-l border-surface-subtle p-sm text-center",
                  dia === hoy && "bg-primary-subtle",
                )}
              >
                <span
                  className={cn(
                    "block text-label-sm tracking-wider uppercase",
                    dia === hoy ? "font-bold text-primary" : "text-fg-secondary",
                  )}
                >
                  {etiquetasDia[dia]} {fecha.getDate()}
                </span>
                <span
                  className={cn(
                    "block text-title-md",
                    dia === hoy ? "font-bold text-primary" : "text-foreground",
                  )}
                >
                  {fecha.getDate()}
                </span>
              </div>
            ))}
          </div>

          {horas.map((hora) => (
            <div
              key={hora}
              className="grid grid-cols-[64px_repeat(6,1fr)] border-t border-surface-subtle"
            >
              <div className="px-2 py-1.5 text-right text-label-sm text-fg-secondary">
                {hora}
              </div>
              {fechas.map(({ dia }) => (
                <div
                  key={dia}
                  className={cn(
                    "min-h-20 min-w-0 border-l border-surface-subtle p-1.5",
                    dia === hoy && "bg-primary-subtle/40",
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { AgendaGrid }

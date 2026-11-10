import { CalendarDays } from "lucide-react"
import { estados } from "@/components/secretary/status-badge"
import {
  type DiaSemana,
  type TurnoDelDia,
  turnosDelDia,
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

export type DiaDeAgenda = {
  dia: DiaSemana
  numero: number
}

/** Hour bucket of a turno: 08:30 belongs to the 08:00 row. */
const horaDeFila = (hora: string) => `${hora.slice(0, 2)}:00`

function agruparPorHora(turnos: TurnoDelDia[]) {
  const porHora: Record<string, TurnoDelDia[]> = {}

  for (const turno of turnos) {
    const fila = horaDeFila(turno.hora)
    porHora[fila] = [...(porHora[fila] ?? []), turno]
  }

  return porHora
}

function TurnoCelda({ turno }: { turno: TurnoDelDia }) {
  const tono = estados[turno.estado]

  return (
    <div className={cn("rounded-lg px-2 py-1.5", tono.pill)}>
      <span className="flex items-center justify-between gap-1">
        <span
          className="truncate text-label-sm font-bold"
          title={`${turno.hora} · ${turno.paciente.nombre} · ${tono.label}`}
        >
          {turno.hora} · {turno.paciente.nombre}
        </span>
        <span
          className={cn("size-2 shrink-0 rounded-full", tono.dot)}
          aria-hidden="true"
        />
      </span>
      <span className="block truncate text-body-sm" title={turno.motivo}>
        {turno.motivo}
      </span>
    </div>
  )
}

function AgendaGrid({
  label,
  dias,
  hoy,
}: {
  label: string
  dias: DiaDeAgenda[]
  hoy: DiaSemana | null
}) {
  const porDia = dias.map(({ dia }) => agruparPorHora(turnosDelDia(dia)))

  return (
    <section className="flex flex-col gap-lg">
      <div className="flex flex-wrap items-center justify-between gap-md">
        <div className="flex items-center gap-sm rounded-xl border border-surface-subtle bg-card px-md py-sm shadow-card">
          <CalendarDays className="size-5 shrink-0 text-primary" aria-hidden="true" />
          <h1 className="text-title-md font-semibold tracking-tight text-foreground">
            {label}
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
            {dias.map(({ dia, numero }) => (
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
                  {etiquetasDia[dia]} {numero}
                </span>
                <span
                  className={cn(
                    "block text-title-md",
                    dia === hoy ? "font-bold text-primary" : "text-foreground",
                  )}
                >
                  {numero}
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
              {dias.map(({ dia }, indice) => (
                <div
                  key={dia}
                  className={cn(
                    "flex min-h-20 min-w-0 flex-col gap-1 border-l border-surface-subtle p-1.5",
                    dia === hoy && "bg-primary-subtle/40",
                  )}
                >
                  {(porDia[indice][hora] ?? []).map((turno) => (
                    <TurnoCelda key={turno.id} turno={turno} />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { AgendaGrid }

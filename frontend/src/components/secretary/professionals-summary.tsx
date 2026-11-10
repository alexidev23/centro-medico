import { Award, DoorOpen, Users } from "lucide-react"
import { KpiCard } from "@/components/secretary/kpi-card"
import type { ResumenDelCuerpo } from "@/lib/secretary/demo-data"

/** Counted note: "1 pendiente", "2 pendientes". */
function contar(cantidad: number, singular: string, plural: string) {
  return `${cantidad} ${cantidad === 1 ? singular : plural}`
}

function ProfessionalsSummary({ resumen }: { resumen: ResumenDelCuerpo }) {
  const {
    profesionales,
    especialidades,
    consultorios,
    turnosDeHoy,
    atendidosHoy,
    enEsperaHoy,
    pendientesHoy,
  } = resumen

  return (
    <section
      aria-label="Resumen del cuerpo profesional"
      className="grid gap-md sm:grid-cols-2 xl:grid-cols-3"
    >
      <KpiCard
        label="Especialistas activos"
        value={profesionales}
        note={`${contar(especialidades, "especialidad", "especialidades")}, todas con agenda esta semana`}
        icon={Award}
      />
      <KpiCard
        label="Consultorios en uso"
        value={consultorios}
        note="Todos con agenda esta semana"
        icon={DoorOpen}
      />
      <KpiCard
        label="Turnos de hoy"
        value={turnosDeHoy}
        note={`${contar(atendidosHoy, "atendido", "atendidos")} • ${enEsperaHoy} en espera • ${contar(pendientesHoy, "pendiente", "pendientes")}`}
        icon={Users}
      />
    </section>
  )
}

export { ProfessionalsSummary }

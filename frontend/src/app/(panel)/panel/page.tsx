import type { Metadata } from "next"
import { Suspense } from "react"
import { connection } from "next/server"
import { CalendarCheck, CalendarX, Hourglass, UserCheck } from "lucide-react"
import { KpiCard } from "@/components/secretary/kpi-card"
import { TodayTurnos } from "@/components/secretary/today-turnos"
import {
  diaDeLaSemana,
  resumenDelDia,
  turnosDelDia,
  type DiaSemana,
} from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Panel de secretaría · Centro Médico Aurora",
}

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
})

function DashboardHead({ fecha }: { fecha: Date }) {
  return (
    <>
      <p className="text-label-sm font-semibold tracking-wide text-fg-secondary uppercase">
        {dateFormatter.format(fecha)} · Nueva Córdoba
      </p>
      <h1 className="mt-1 text-headline-lg font-bold tracking-tight text-foreground">
        Buen día
      </h1>
      <p className="mt-1 max-w-[46rem] text-body-md leading-snug text-fg-secondary">
        Resumen de la actividad de la sede. Datos de demostración: todavía no
        hay backend que los actualice.
      </p>
    </>
  )
}

function DashboardStats({ dia }: { dia: DiaSemana }) {
  const resumen = resumenDelDia(dia)

  return (
    <div className="grid gap-md sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Turnos de hoy"
        value={resumen.total}
        note={`De ${resumen.primeraHora} a ${resumen.ultimaHora}`}
        icon={CalendarCheck}
      />
      <KpiCard
        label="Pendientes de confirmar"
        value={resumen.pendientes}
        note="Todavía sin confirmar"
        icon={Hourglass}
        tone="pending"
      />
      <KpiCard
        label="Cancelaciones de hoy"
        value={resumen.cancelados}
        note="No se atienden hoy"
        icon={CalendarX}
        tone="cancelled"
      />
      <KpiCard
        label="Atendidos"
        value={resumen.atendidos}
        note={`De ${resumen.total} turnos del día`}
        icon={UserCheck}
        tone="confirmed"
      />
    </div>
  )
}

async function PanelDashboard() {
  await connection()

  const fecha = new Date()
  const dia = diaDeLaSemana(fecha)

  return (
    <>
      <DashboardHead fecha={fecha} />
      {dia ? (
        <>
          <div className="mt-lg">
            <DashboardStats dia={dia} />
          </div>
          <div className="mt-lg">
            <TodayTurnos turnos={turnosDelDia(dia)} />
          </div>
        </>
      ) : (
        <p className="mt-lg rounded-xl border border-surface-subtle bg-card p-lg text-body-md text-fg-secondary shadow-card">
          La sede no atiende los domingos.
        </p>
      )}
    </>
  )
}

export default function PanelPage() {
  return (
    <div className="flex max-w-[80rem] flex-col">
      <Suspense fallback={<p className="h-4" />}>
        <PanelDashboard />
      </Suspense>
    </div>
  )
}

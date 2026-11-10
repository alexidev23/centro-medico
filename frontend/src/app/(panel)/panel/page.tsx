import type { Metadata } from "next"
import { Suspense } from "react"
import { connection } from "next/server"

export const metadata: Metadata = {
  title: "Panel de secretaría · Centro Médico Aurora",
}

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
})

async function DashboardHead() {
  await connection()

  return (
    <>
      <p className="text-label-sm font-semibold tracking-wide text-fg-secondary uppercase">
        {dateFormatter.format(new Date())} · Nueva Córdoba
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

export default function PanelPage() {
  return (
    <div className="flex max-w-[80rem] flex-col">
      <Suspense fallback={<p className="h-4" />}>
        <DashboardHead />
      </Suspense>
    </div>
  )
}

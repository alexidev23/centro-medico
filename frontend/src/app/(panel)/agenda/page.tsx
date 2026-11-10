import type { Metadata } from "next"
import { Suspense } from "react"
import { connection } from "next/server"
import { AgendaGrid } from "@/components/secretary/agenda-grid"
import { diaDeLaSemana, fechasDeLaSemana } from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Agenda semanal · Centro Médico Aurora",
}

async function AgendaSemanal() {
  await connection()

  const fecha = new Date()

  return (
    <AgendaGrid fechas={fechasDeLaSemana(fecha)} hoy={diaDeLaSemana(fecha)} />
  )
}

export default function AgendaPage() {
  return (
    <div className="flex max-w-[80rem] flex-col">
      <Suspense fallback={<p className="h-4" />}>
        <AgendaSemanal />
      </Suspense>
    </div>
  )
}

import type { Metadata } from "next"
import { Suspense } from "react"
import { connection } from "next/server"
import { ProfessionalsHeader } from "@/components/secretary/professionals-header"
import { ProfessionalsSummary } from "@/components/secretary/professionals-summary"
import { resumenDelCuerpoProfesional } from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Profesionales — Centro Médico Aurora",
}

async function CuerpoProfesional() {
  await connection()

  const fecha = new Date()

  return (
    <>
      <ProfessionalsHeader gestion={fecha.getFullYear()} />
      <ProfessionalsSummary resumen={resumenDelCuerpoProfesional(fecha)} />
    </>
  )
}

export default function ProfesionalesPage() {
  return (
    <div className="flex max-w-[80rem] flex-col gap-lg">
      <Suspense fallback={<p className="h-4" />}>
        <CuerpoProfesional />
      </Suspense>
    </div>
  )
}

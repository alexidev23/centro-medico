import type { Metadata } from "next"
import { Suspense } from "react"
import { connection } from "next/server"
import { ProfessionalCard } from "@/components/secretary/professional-card"
import { ProfessionalsHeader } from "@/components/secretary/professionals-header"
import { ProfessionalsSummary } from "@/components/secretary/professionals-summary"
import {
  cuerpoProfesional,
  resumenDelCuerpoProfesional,
} from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Profesionales — Centro Médico Aurora",
}

async function CuerpoProfesional() {
  await connection()

  const fecha = new Date()
  const cuerpo = cuerpoProfesional(fecha)

  return (
    <>
      <ProfessionalsHeader gestion={fecha.getFullYear()} />
      <ProfessionalsSummary resumen={resumenDelCuerpoProfesional(fecha)} />
      <section
        aria-label="Cuerpo profesional"
        className="grid gap-md sm:grid-cols-2 xl:grid-cols-3"
      >
        {cuerpo.map((profesional) => (
          <ProfessionalCard key={profesional.id} profesional={profesional} />
        ))}
      </section>
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

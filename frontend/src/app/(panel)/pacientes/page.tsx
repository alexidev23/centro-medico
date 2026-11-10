import type { Metadata } from "next"
import { Suspense } from "react"
import { connection } from "next/server"
import { PatientDirectory } from "@/components/secretary/patient-directory"
import { pacientesDelPadron } from "@/lib/secretary/demo-data"

export const metadata: Metadata = {
  title: "Pacientes · Centro Médico Aurora",
}

async function Padron() {
  await connection()

  return <PatientDirectory pacientes={pacientesDelPadron(new Date())} />
}

export default function PacientesPage() {
  return (
    <div className="flex max-w-[80rem] flex-col">
      <Suspense fallback={<p className="h-4" />}>
        <Padron />
      </Suspense>
    </div>
  )
}

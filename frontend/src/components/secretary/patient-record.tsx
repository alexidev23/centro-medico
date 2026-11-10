"use client"

import { useState } from "react"
import { PatientDatos } from "@/components/secretary/patient-datos"
import { PatientHistory } from "@/components/secretary/patient-history"
import { PatientTabs, type TabDeLaFicha } from "@/components/secretary/patient-tabs"
import { coberturaDe, type PacienteDelPadron } from "@/lib/secretary/demo-data"
import { initials } from "@/lib/utils"

function PatientRecord({ paciente }: { paciente: PacienteDelPadron }) {
  const [tab, setTab] = useState<TabDeLaFicha>("historial")

  return (
    <section className="flex flex-col gap-md rounded-xl border border-surface-subtle bg-card p-lg shadow-card">
      <div className="flex items-start gap-md">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary-subtle text-headline-sm font-bold text-primary">
          {initials(paciente.nombre)}
        </span>
        <div className="flex min-w-0 flex-col">
          <h2 className="text-headline-sm font-bold tracking-tight text-foreground">
            {paciente.nombre}
          </h2>
          <p className="mt-0.5 flex flex-wrap items-center gap-2 text-body-sm text-fg-secondary">
            <span className="font-semibold text-foreground">
              {paciente.edad} años
            </span>
            <span aria-hidden="true">•</span>
            <span>DNI {paciente.documento}</span>
          </p>
          <span className="mt-2 inline-flex w-fit items-center rounded-full bg-primary-subtle px-2.5 py-0.5 text-label-sm font-semibold text-primary">
            {coberturaDe(paciente)}
          </span>
        </div>
      </div>

      <PatientTabs activo={tab} onCambiar={setTab} />

      {tab === "historial" ? (
        <div role="tabpanel" id="panel-historial" aria-labelledby="tab-historial">
          <PatientHistory proximo={paciente.proximo} />
        </div>
      ) : (
        <div role="tabpanel" id="panel-datos" aria-labelledby="tab-datos">
          <PatientDatos paciente={paciente} />
        </div>
      )}
    </section>
  )
}

export { PatientRecord }

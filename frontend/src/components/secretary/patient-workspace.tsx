"use client"

import { useRef, useState } from "react"
import { PatientDirectory } from "@/components/secretary/patient-directory"
import { PatientRecord } from "@/components/secretary/patient-record"
import { useFiltrosPadron } from "@/components/secretary/use-filtros-padron"
import type { PacienteDelPadron } from "@/lib/secretary/demo-data"

function PatientWorkspace({ pacientes }: { pacientes: PacienteDelPadron[] }) {
  const { filtros, setFiltros, visibles } = useFiltrosPadron(pacientes)
  const [seleccionadoId, setSeleccionadoId] = useState<string | null>(null)
  const fichaRef = useRef<HTMLDivElement>(null)

  // A filter can hide the selected patient: fall back to the first one on
  // screen instead of showing a record that is no longer in the table.
  const seleccionado =
    visibles.find(({ id }) => id === seleccionadoId) ?? visibles[0] ?? null

  const seleccionar = (id: string) => {
    setSeleccionadoId(id)

    // Under xl the record sits below the table, so it has to be brought into view.
    if (window.matchMedia("(max-width: 1279px)").matches) {
      fichaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="grid items-start gap-lg xl:grid-cols-12">
      <div className="min-w-0 xl:col-span-7">
        <PatientDirectory
          pacientes={pacientes}
          visibles={visibles}
          filtros={filtros}
          onFiltros={setFiltros}
          seleccionadoId={seleccionado?.id ?? null}
          onSeleccionar={seleccionar}
        />
      </div>
      {seleccionado ? (
        <div ref={fichaRef} className="min-w-0 scroll-mt-lg xl:col-span-5">
          <PatientRecord paciente={seleccionado} />
        </div>
      ) : null}
    </div>
  )
}

export { PatientWorkspace }

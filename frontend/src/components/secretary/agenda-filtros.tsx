"use client"

import { ChevronDown } from "lucide-react"
import { profesionales } from "@/lib/secretary/demo-data"

export type FiltrosAgenda = {
  profesionalId: string
  especialidad: string
  consultorio: string
}

export const filtrosVacios: FiltrosAgenda = {
  profesionalId: "todos",
  especialidad: "todas",
  consultorio: "todos",
}

type Opcion = { valor: string; etiqueta: string }

const unicos = (valores: string[]) => [...new Set(valores)]

const opcionesProfesional: Opcion[] = [
  { valor: "todos", etiqueta: "Todos los profesionales" },
  ...profesionales.map(({ id, nombre, especialidad }) => ({
    valor: id,
    etiqueta: `${nombre} — ${especialidad}`,
  })),
]

const opcionesEspecialidad: Opcion[] = [
  { valor: "todas", etiqueta: "Todas las especialidades" },
  ...unicos(profesionales.map(({ especialidad }) => especialidad)).map(
    (especialidad) => ({ valor: especialidad, etiqueta: especialidad }),
  ),
]

const opcionesConsultorio: Opcion[] = [
  { valor: "todos", etiqueta: "Todos los consultorios" },
  ...unicos(profesionales.map(({ consultorio }) => consultorio)).map(
    (consultorio) => ({ valor: consultorio, etiqueta: consultorio }),
  ),
]

function SelectFiltro({
  label,
  valor,
  opciones,
  onChange,
}: {
  label: string
  valor: string
  opciones: Opcion[]
  onChange: (valor: string) => void
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-label-sm text-fg-secondary">{label}</span>
      <span className="relative block">
        <select
          value={valor}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-xl bg-surface-subtle px-md pr-10 text-body-md text-foreground"
        >
          {opciones.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.etiqueta}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-3.5 right-3 size-4 text-fg-secondary"
          aria-hidden="true"
        />
      </span>
    </label>
  )
}

function AgendaFiltros({
  filtros,
  onChange,
}: {
  filtros: FiltrosAgenda
  onChange: (filtros: FiltrosAgenda) => void
}) {
  return (
    <div className="flex flex-col gap-md rounded-xl border border-surface-subtle bg-card p-md shadow-card sm:flex-row">
      <SelectFiltro
        label="Profesional"
        valor={filtros.profesionalId}
        opciones={opcionesProfesional}
        onChange={(profesionalId) => onChange({ ...filtros, profesionalId })}
      />
      <SelectFiltro
        label="Especialidad"
        valor={filtros.especialidad}
        opciones={opcionesEspecialidad}
        onChange={(especialidad) => onChange({ ...filtros, especialidad })}
      />
      <SelectFiltro
        label="Consultorio"
        valor={filtros.consultorio}
        opciones={opcionesConsultorio}
        onChange={(consultorio) => onChange({ ...filtros, consultorio })}
      />
    </div>
  )
}

export { AgendaFiltros }

"use client"

import { useState, type ReactNode } from "react"
import { Search, X } from "lucide-react"
import { ProfessionalCard } from "@/components/secretary/professional-card"
import type { ProfesionalDelCuerpo } from "@/lib/secretary/demo-data"

const normalizar = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

/** Readers type "34892" for "34.892": compare letters and digits only. */
const alfanumerico = (texto: string) => normalizar(texto).replace(/[^a-z0-9]/g, "")

function coincide(profesional: ProfesionalDelCuerpo, consulta: string) {
  const buscado = alfanumerico(consulta)
  if (buscado === "") return true

  return [
    profesional.nombre,
    profesional.matricula,
    profesional.dondeAtiende,
  ].some((campo) => alfanumerico(campo).includes(buscado))
}

function ChipEspecialidad({
  activo,
  conteo,
  onClick,
  children,
}: {
  activo: boolean
  conteo: number
  onClick: () => void
  children: ReactNode
}) {
  return (
    // Hand-concatenated: cn() would drop text-label-md, reading it as a colour.
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={`flex h-10 items-center gap-2 rounded-full px-4 text-label-md whitespace-nowrap transition-colors ${
        activo
          ? "bg-primary font-semibold text-primary-foreground"
          : "bg-surface-subtle text-fg-secondary hover:text-foreground"
      }`}
    >
      {children}
      <span
        className={`rounded-full px-2 py-0.5 text-label-sm font-bold ${
          activo ? "bg-primary-dark text-primary-foreground" : "bg-card"
        }`}
      >
        {conteo}
      </span>
    </button>
  )
}

function ProfessionalsDirectory({ cuerpo }: { cuerpo: ProfesionalDelCuerpo[] }) {
  const [consulta, setConsulta] = useState("")
  const [especialidad, setEspecialidad] = useState("todas")

  const especialidades = [...new Set(cuerpo.map((uno) => uno.especialidad))]
  const visibles = cuerpo.filter(
    (uno) =>
      (especialidad === "todas" || uno.especialidad === especialidad) &&
      coincide(uno, consulta),
  )

  return (
    <>
      <section
        aria-label="Buscar profesionales"
        className="flex flex-col gap-md rounded-xl border border-surface-subtle bg-card p-md shadow-card"
      >
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-md size-5 -translate-y-1/2 text-fg-secondary"
            aria-hidden="true"
          />
          <input
            type="search"
            value={consulta}
            onChange={(event) => setConsulta(event.target.value)}
            placeholder="Buscar por apellido, nombre, matrícula o consultorio..."
            aria-label="Buscar profesional"
            className="h-12 w-full rounded-xl bg-surface-subtle pr-11 pl-11 text-body-md text-foreground placeholder:text-fg-secondary"
          />
          {consulta === "" ? null : (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setConsulta("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-fg-secondary hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="Filtrar por especialidad"
          className="flex flex-wrap items-center gap-2"
        >
          <ChipEspecialidad
            activo={especialidad === "todas"}
            conteo={cuerpo.length}
            onClick={() => setEspecialidad("todas")}
          >
            Todas
          </ChipEspecialidad>
          {especialidades.map((nombre) => (
            <ChipEspecialidad
              key={nombre}
              activo={especialidad === nombre}
              conteo={cuerpo.filter((uno) => uno.especialidad === nombre).length}
              onClick={() => setEspecialidad(nombre)}
            >
              {nombre}
            </ChipEspecialidad>
          ))}
        </div>
      </section>

      {visibles.length === 0 ? (
        <p className="rounded-xl bg-surface-subtle p-lg text-center text-body-md text-fg-secondary">
          No hay profesionales con este filtro.
        </p>
      ) : (
        <section
          aria-label="Cuerpo profesional"
          className="grid gap-md sm:grid-cols-2 xl:grid-cols-3"
        >
          {visibles.map((profesional) => (
            <ProfessionalCard key={profesional.id} profesional={profesional} />
          ))}
        </section>
      )}
    </>
  )
}

export { ProfessionalsDirectory }

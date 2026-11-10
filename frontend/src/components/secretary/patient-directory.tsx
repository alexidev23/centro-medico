"use client"

import type { ReactNode } from "react"
import { Phone, Search, Users, X } from "lucide-react"
import type { FiltrosPadron } from "@/components/secretary/use-filtros-padron"
import type { PacienteDelPadron } from "@/lib/secretary/demo-data"
import { cn, initials } from "@/lib/utils"

const cell = "px-3 py-4 align-top"

function Chip({
  activo,
  onClick,
  children,
}: {
  activo: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={cn(
        "flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-label-sm whitespace-nowrap transition-colors",
        activo
          ? "bg-primary-subtle font-semibold text-primary"
          : "bg-surface-subtle text-fg-secondary hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

function PatientDirectory({
  pacientes,
  visibles,
  filtros,
  onFiltros,
  seleccionadoId,
  onSeleccionar,
}: {
  pacientes: PacienteDelPadron[]
  visibles: PacienteDelPadron[]
  filtros: FiltrosPadron
  onFiltros: (filtros: FiltrosPadron) => void
  seleccionadoId: string | null
  onSeleccionar: (id: string) => void
}) {
  const coberturas = [...new Set(pacientes.map(({ proveedor }) => proveedor))]

  return (
    <section className="flex flex-col gap-lg rounded-xl border border-surface-subtle bg-card p-lg shadow-card">
      <div className="flex flex-col justify-between gap-md sm:flex-row sm:items-center">
        <div>
          <h1 className="text-title-md font-semibold tracking-tight text-foreground">
            Padrón de Pacientes
          </h1>
          <p className="text-body-sm text-fg-secondary">
            Gestión y búsqueda ágil de historias clínicas activas
          </p>
        </div>
        <span className="flex items-center gap-1.5 self-start rounded-full bg-surface-subtle px-sm py-1 text-label-sm text-fg-secondary">
          <Users className="size-4" aria-hidden="true" />
          {visibles.length === pacientes.length
            ? `${pacientes.length} pacientes`
            : `${visibles.length} de ${pacientes.length} pacientes`}
        </span>
      </div>

      <div className="flex flex-col gap-md">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-md size-5 -translate-y-1/2 text-fg-secondary"
            aria-hidden="true"
          />
          <input
            type="search"
            value={filtros.consulta}
            onChange={(event) => onFiltros({ ...filtros, consulta: event.target.value })}
            placeholder="Buscar por nombre, DNI o teléfono"
            aria-label="Buscar paciente"
            className="h-12 w-full rounded-xl bg-surface-subtle pr-11 pl-11 text-body-md text-foreground placeholder:text-fg-secondary"
          />
          {filtros.consulta === "" ? null : (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => onFiltros({ ...filtros, consulta: "" })}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-fg-secondary hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-label-sm text-fg-secondary">Cobertura:</span>
          <Chip
            activo={filtros.cobertura === "todas"}
            onClick={() => onFiltros({ ...filtros, cobertura: "todas" })}
          >
            Todas
          </Chip>
          {coberturas.map((proveedor) => (
            <Chip
              key={proveedor}
              activo={filtros.cobertura === proveedor}
              onClick={() => onFiltros({ ...filtros, cobertura: proveedor })}
            >
              {proveedor}
            </Chip>
          ))}
          <Chip
            activo={filtros.soloConTurno}
            onClick={() =>
              onFiltros({ ...filtros, soloConTurno: !filtros.soloConTurno })
            }
          >
            <span
              className={cn(
                "size-2 rounded-full",
                filtros.soloConTurno ? "bg-primary" : "bg-fg-secondary",
              )}
              aria-hidden="true"
            />
            Con turno próximo
          </Chip>
        </div>
      </div>

      {visibles.length === 0 ? (
        <p className="rounded-xl bg-surface-subtle p-lg text-center text-body-md text-fg-secondary">
          No hay pacientes con este filtro.
        </p>
      ) : null}

      <div className="-mx-lg overflow-x-auto px-lg">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="bg-surface-subtle text-label-sm text-fg-secondary">
              <th scope="col" className="rounded-l-lg px-3 py-3 font-semibold">
                Paciente &amp; DNI
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Cobertura
              </th>
              <th scope="col" className="hidden px-3 py-3 font-semibold xl:table-cell">
                Contacto
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Próximo turno
              </th>
              <th scope="col" className="rounded-r-lg px-3 py-3 text-right font-semibold">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-subtle">
            {visibles.map((paciente) => {
              const { proximo } = paciente
              const activo = paciente.id === seleccionadoId

              return (
                <tr
                  key={paciente.id}
                  aria-current={activo ? "true" : undefined}
                  tabIndex={0}
                  onClick={() => onSeleccionar(paciente.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      onSeleccionar(paciente.id)
                    }
                  }}
                  className={cn(
                    "cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-primary",
                    activo
                      ? "bg-primary-subtle/60 shadow-[inset_3px_0_0_0_var(--color-primary)]"
                      : "hover:bg-primary-subtle/50",
                  )}
                >
                  <td className={cell}>
                    <div className="flex items-center gap-sm">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-label-md font-bold text-primary">
                        {initials(paciente.nombre)}
                      </span>
                      <div className="flex min-w-0 flex-col">
                        {/*
                          Plain concatenation on purpose: cn() would silently drop
                          text-label-lg, because tailwind-merge reads an unknown
                          text-* utility as a color and keeps only the last one.
                        */}
                        <span
                          className={`truncate text-label-lg ${
                            activo
                              ? "font-bold text-primary"
                              : "font-semibold text-foreground"
                          }`}
                        >
                          {paciente.nombre}
                        </span>
                        <span className="text-body-sm whitespace-nowrap text-fg-secondary">
                          DNI {paciente.documento}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className={cell}>
                    <span className="block text-label-md font-semibold text-foreground">
                      {paciente.proveedor}
                    </span>
                    {paciente.plan ? (
                      <span className="block text-body-sm text-fg-secondary">
                        Plan {paciente.plan}
                      </span>
                    ) : null}
                  </td>
                  <td className={cn(cell, "hidden xl:table-cell")}>
                    <span className="flex items-center gap-1.5 text-body-sm whitespace-nowrap text-fg-secondary">
                      <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      {paciente.telefono}
                    </span>
                  </td>
                  <td className={cell}>
                    {proximo ? (
                      <>
                        <span className="block text-label-md font-semibold whitespace-nowrap text-primary">
                          {proximo.cuando}
                        </span>
                        <span className="block text-body-sm text-fg-secondary">
                          {proximo.profesional}
                        </span>
                      </>
                    ) : (
                      <span className="text-body-sm whitespace-nowrap text-fg-secondary">
                        Sin turno agendado
                      </span>
                    )}
                  </td>
                  <td className={cn(cell, "text-right")}>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm whitespace-nowrap",
                        proximo
                          ? "bg-status-confirmed-bg text-status-confirmed-text"
                          : "bg-surface-subtle text-fg-secondary",
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          proximo ? "bg-status-confirmed" : "bg-fg-secondary",
                        )}
                        aria-hidden="true"
                      />
                      {proximo ? "Con turno" : "Sin turno"}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-body-sm text-fg-secondary">
        El estado indica si el paciente tiene un turno agendado esta semana. La
        cobertura se muestra como la informa cada obra social.
      </p>
    </section>
  )
}

export { PatientDirectory }

"use client"

import { useState } from "react"
import { StatusBadge } from "@/components/secretary/status-badge"
import { consultorioCorto, type TurnoDelDia } from "@/lib/secretary/demo-data"
import { cn } from "@/lib/utils"

type Filtro = "todos" | "manana" | "tarde" | "en-sala" | "atendidos"

const filtros: { id: Filtro; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "manana", label: "Mañana" },
  { id: "tarde", label: "Tarde" },
  { id: "en-sala", label: "En sala" },
  { id: "atendidos", label: "Atendidos" },
]

const matchers: Record<Filtro, (turno: TurnoDelDia) => boolean> = {
  todos: () => true,
  manana: (turno) => turno.hora < "12:00",
  tarde: (turno) => turno.hora >= "12:00",
  "en-sala": (turno) => turno.estado === "en-sala",
  atendidos: (turno) => turno.estado === "atendido",
}

const initials = (nombre: string) =>
  nombre.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase()

const cell = "px-3 py-4 align-top"

function TodayTurnos({ turnos }: { turnos: TurnoDelDia[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos")
  const visibles = turnos.filter(matchers[filtro])

  return (
    <section className="flex flex-col gap-lg rounded-xl border border-surface-subtle bg-card p-lg shadow-card">
      <div className="flex flex-col justify-between gap-md xl:flex-row xl:items-center">
        <h2 className="text-title-md font-semibold tracking-tight text-foreground">
          Turnos programados para hoy
        </h2>
        <div role="group" aria-label="Filtrar turnos" className="flex gap-1 overflow-x-auto rounded-xl bg-surface-subtle p-1">
          {filtros.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={id === filtro}
              onClick={() => setFiltro(id)}
              className={cn(
                "h-9 shrink-0 rounded-lg px-3.5 text-label-sm whitespace-nowrap transition-colors",
                id === filtro ? "bg-card text-primary shadow-card" : "text-fg-secondary hover:text-foreground",
              )}
            >
              {label} ({turnos.filter(matchers[id]).length})
            </button>
          ))}
        </div>
      </div>

      <div className="-mx-lg overflow-x-auto px-lg">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <thead>
            <tr className="bg-surface-subtle text-label-sm text-fg-secondary">
              <th scope="col" className="rounded-l-lg px-3 py-3 font-semibold">Horario</th>
              <th scope="col" className="px-3 py-3 font-semibold">Paciente</th>
              <th scope="col" className="px-3 py-3 font-semibold">Profesional &amp; Especialidad</th>
              <th scope="col" className="hidden px-3 py-3 font-semibold xl:table-cell">Cobertura</th>
              <th scope="col" className="rounded-r-lg px-3 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-subtle">
            {visibles.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-body-sm text-fg-secondary">
                  No hay turnos con este filtro.
                </td>
              </tr>
            ) : (
              visibles.map((turno) => (
                <tr key={turno.id} className="transition-colors hover:bg-primary-subtle/50">
                  <td className={cell}>
                    <span className="text-label-lg font-bold text-foreground">{turno.hora}</span>
                    <span className="block text-body-sm whitespace-nowrap text-fg-secondary">{consultorioCorto(turno.profesional.consultorio)}</span>
                  </td>
                  <td className={cell}>
                    <div className="flex items-center gap-sm">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-label-md font-bold text-primary">
                        {initials(turno.paciente.nombre)}
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-label-lg font-semibold text-foreground">{turno.paciente.nombre}</span>
                        <span className="text-body-sm whitespace-nowrap text-fg-secondary">DNI {turno.paciente.documento}</span>
                      </div>
                    </div>
                  </td>
                  <td className={cell}>
                    <span className="block text-label-md font-semibold text-foreground">{turno.profesional.nombre}</span>
                    <span className="block text-body-sm text-fg-secondary">{turno.profesional.especialidad}</span>
                  </td>
                  <td className={cn(cell, "hidden xl:table-cell")}>
                    <span className="inline-block rounded-md bg-surface-subtle px-2.5 py-1 text-label-sm font-medium whitespace-nowrap text-fg-secondary">
                      {turno.paciente.cobertura}
                    </span>
                  </td>
                  <td className={cell}>
                    <StatusBadge estado={turno.estado} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export { TodayTurnos }

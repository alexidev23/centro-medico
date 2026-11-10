"use client"

import { useRef, type KeyboardEvent } from "react"

export type TabDeLaFicha = "historial" | "datos"

const tabs = [
  { id: "historial", label: "Historial" },
  { id: "datos", label: "Datos" },
] as const

function PatientTabs({
  activo,
  onCambiar,
}: {
  activo: TabDeLaFicha
  onCambiar: (tab: TabDeLaFicha) => void
}) {
  const lista = useRef<HTMLDivElement>(null)

  // Left/right move the selection and the focus, as a tablist is expected to.
  const mover = (evento: KeyboardEvent<HTMLButtonElement>) => {
    if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return

    evento.preventDefault()
    const indice = tabs.findIndex(({ id }) => id === activo)
    const paso = evento.key === "ArrowRight" ? 1 : tabs.length - 1
    const siguiente = tabs[(indice + paso) % tabs.length]

    onCambiar(siguiente.id)
    lista.current
      ?.querySelector<HTMLButtonElement>(`[data-tab="${siguiente.id}"]`)
      ?.focus()
  }

  return (
    <div
      ref={lista}
      role="tablist"
      aria-label="Ficha del paciente"
      className="flex items-center gap-1 rounded-xl bg-surface-subtle p-1"
    >
      {tabs.map(({ id, label }) => {
        const seleccionado = id === activo

        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            data-tab={id}
            aria-selected={seleccionado}
            aria-controls={`panel-${id}`}
            tabIndex={seleccionado ? 0 : -1}
            onClick={() => onCambiar(id)}
            onKeyDown={mover}
            // Concatenated by hand: cn() would drop text-label-sm, because
            // tailwind-merge reads an unknown text-* utility as a colour.
            className={`flex-1 rounded-lg px-sm py-2 text-label-sm transition-colors ${
              seleccionado
                ? "bg-card font-bold text-primary shadow-card"
                : "font-medium text-fg-secondary hover:text-foreground"
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export { PatientTabs }

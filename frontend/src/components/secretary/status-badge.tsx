import type { TurnoEstado } from "@/lib/secretary/demo-data"
import { cn } from "@/lib/utils"

const estados: Record<TurnoEstado, { label: string; pill: string; dot: string }> = {
  pendiente: { label: "Pendiente", pill: "bg-status-pending-bg text-status-pending-text", dot: "bg-status-pending" },
  confirmado: { label: "Confirmado", pill: "bg-status-confirmed-bg text-status-confirmed-text", dot: "bg-status-confirmed" },
  "en-sala": { label: "En sala", pill: "bg-primary-light text-primary-dark", dot: "bg-primary" },
  atendido: { label: "Atendido", pill: "bg-surface-subtle text-fg-secondary", dot: "bg-fg-secondary" },
  cancelado: { label: "Cancelado", pill: "bg-status-cancelled-bg text-status-cancelled-text", dot: "bg-status-cancelled" },
}

function StatusBadge({ estado }: { estado: TurnoEstado }) {
  const { label, pill, dot } = estados[estado]

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm whitespace-nowrap", pill)}>
      <span className={cn("size-2 rounded-full", dot)} aria-hidden="true" />
      {label}
    </span>
  )
}

export { StatusBadge, estados }

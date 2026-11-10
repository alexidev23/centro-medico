import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type KpiTone = "neutral" | "pending" | "cancelled" | "confirmed"

const tones: Record<KpiTone, { value: string; tile: string }> = {
  neutral: { value: "text-foreground", tile: "bg-surface-subtle text-primary" },
  pending: {
    value: "text-status-pending-text",
    tile: "bg-status-pending-bg text-status-pending-text",
  },
  cancelled: {
    value: "text-status-cancelled-text",
    tile: "bg-status-cancelled-bg text-status-cancelled-text",
  },
  confirmed: {
    value: "text-status-confirmed-text",
    tile: "bg-status-confirmed-bg text-status-confirmed-text",
  },
}

type KpiCardProps = {
  label: string
  value: number
  note: string
  icon: LucideIcon
  tone?: KpiTone
}

function KpiCard({
  label,
  value,
  note,
  icon: Icon,
  tone = "neutral",
}: KpiCardProps) {
  const styles = tones[tone]

  return (
    <div className="flex flex-col justify-between rounded-xl border border-surface-subtle bg-card p-lg shadow-card">
      <div className="flex items-start justify-between gap-sm">
        <div className="flex min-w-0 flex-col">
          <span className="text-label-md text-fg-secondary">{label}</span>
          <span
            className={cn(
              "mt-xs text-display leading-none font-bold tabular-nums",
              styles.value,
            )}
          >
            {value}
          </span>
        </div>
        <span
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-xl",
            styles.tile,
          )}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-lg text-body-sm text-fg-secondary">{note}</p>
    </div>
  )
}

export { KpiCard }

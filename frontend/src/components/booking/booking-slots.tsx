"use client"

import { Sun, Sunset } from "lucide-react"
import { daySchedule, formatDayMonth, type DateKey } from "@/lib/booking-availability"
import { cn } from "@/lib/utils"

const GROUP_ICONS = [Sun, Sunset]

type BookingSlotsProps = {
  date: DateKey
  value: string | null
  onChange: (time: string) => void
}

function BookingSlots({ date, value, onChange }: BookingSlotsProps) {
  const groups = daySchedule(date)
  const free = groups.reduce(
    (total, group) => total + group.slots.filter((slot) => !slot.taken).length,
    0,
  )

  return (
    <div className="mt-lg flex max-w-[34rem] flex-col gap-md">
      <div className="flex flex-wrap items-center justify-between gap-x-md gap-y-xs">
        <h3 className="text-title-md font-semibold text-foreground">
          Horarios para el {formatDayMonth(date)}
        </h3>
        <span className="text-[13px] font-semibold text-primary">
          {free} horarios libres
        </span>
      </div>

      {groups.map((group, index) => {
        const Icon = GROUP_ICONS[index] ?? Sun

        return (
          <div key={group.label} className="flex flex-col gap-xs">
            <span className="flex items-center gap-xs text-label-sm uppercase tracking-wider text-fg-secondary">
              <Icon className="size-4" aria-hidden="true" />
              {group.label}
            </span>
            <div className="grid grid-cols-3 gap-xs sm:grid-cols-4">
              {group.slots.map((slot) => {
                const selected = slot.time === value

                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={slot.taken}
                    aria-pressed={slot.taken ? undefined : selected}
                    onClick={() => onChange(slot.time)}
                    className={cn(
                      "flex h-10 items-center justify-center gap-1 rounded-lg text-label-md transition-colors",
                      slot.taken
                        ? "cursor-not-allowed bg-surface-subtle/40 text-placeholder opacity-70"
                        : "bg-surface-subtle font-semibold text-primary hover:bg-secondary",
                      selected && "bg-primary text-primary-foreground shadow-card",
                    )}
                  >
                    <span className={slot.taken ? "line-through" : undefined}>
                      {slot.time}
                    </span>
                    {slot.taken ? <span className="hidden sm:inline">(No disp.)</span> : null}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { BookingSlots }

"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  formatLongDate,
  formatMonth,
  isSelectableDay,
  monthGrid,
  monthOf,
  shiftMonth,
  type DateKey,
} from "@/lib/booking-availability"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

const MONTH_BUTTON =
  "flex size-8 items-center justify-center rounded-lg bg-card text-foreground transition-colors hover:bg-surface-subtle disabled:cursor-not-allowed disabled:opacity-40 sm:size-9"

type BookingCalendarProps = {
  today: DateKey
  value: DateKey | null
  onChange: (date: DateKey) => void
}

function BookingCalendar({ today, value, onChange }: BookingCalendarProps) {
  const [view, setView] = useState(() => monthOf(today))
  const currentMonth = monthOf(today)
  const isCurrentMonth =
    view.year === currentMonth.year && view.month === currentMonth.month

  return (
    <div className="mt-md max-w-[34rem] rounded-xl bg-background p-md">
      <div className="mb-md flex items-center justify-between gap-sm">
        <h3 className="whitespace-nowrap text-title-md font-semibold text-foreground sm:text-headline-sm">
          {formatMonth(view.year, view.month)}
        </h3>
        <div className="flex items-center gap-xs">
          <button
            type="button"
            aria-label="Mes anterior"
            disabled={isCurrentMonth}
            onClick={() => setView((month) => shiftMonth(month, -1))}
            className={MONTH_BUTTON}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={() => setView((month) => shiftMonth(month, 1))}
            className={MONTH_BUTTON}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mb-xs grid grid-cols-7 gap-1 text-center text-[13px] font-semibold text-fg-secondary">
        {WEEKDAYS.map((weekday, index) => (
          <div key={weekday} className={index > 4 ? "text-placeholder" : undefined}>
            {weekday}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center">
        {monthGrid(view.year, view.month).map((cell) => {
          const selectable = cell.inMonth && isSelectableDay(cell.key, today)
          const selected = cell.key === value

          return (
            <button
              key={cell.key}
              type="button"
              disabled={!selectable}
              aria-label={formatLongDate(cell.key)}
              aria-pressed={selectable ? selected : undefined}
              onClick={() => onChange(cell.key)}
              className={cn(
                "flex h-11 flex-col items-center justify-center rounded-lg text-label-md transition-colors",
                cell.inMonth ? undefined : "text-placeholder/50",
                cell.inMonth && !selectable && "text-placeholder disabled:cursor-not-allowed",
                selectable && "bg-surface-subtle/60 font-semibold text-primary hover:bg-surface-subtle",
                selected && "bg-primary text-primary-foreground shadow-card",
              )}
            >
              <span>{cell.day}</span>
              {selected ? (
                <span className="hidden text-[10px] font-semibold leading-none sm:block">
                  Elegido
                </span>
              ) : selectable ? (
                <span className="mt-0.5 size-1.5 rounded-full bg-primary" />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { BookingCalendar }

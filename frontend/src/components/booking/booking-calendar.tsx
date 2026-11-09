import {
  formatMonth,
  isSelectableDay,
  monthGrid,
  monthOf,
  type DateKey,
} from "@/lib/booking-availability"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

type BookingCalendarProps = {
  today: DateKey
}

function BookingCalendar({ today }: BookingCalendarProps) {
  const view = monthOf(today)

  return (
    <section className="rounded-xl bg-card p-md shadow-card md:p-lg">
      <div className="flex items-center gap-sm">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-label-sm font-bold text-primary">
          2
        </span>
        <div>
          <h2 className="text-title-md font-bold text-foreground">
            Elegí fecha y horario disponible
          </h2>
          <p className="text-body-sm text-fg-secondary">
            Seleccioná un día hábil para ver los turnos disponibles.
          </p>
        </div>
      </div>

      <div className="mt-md max-w-[34rem] rounded-xl bg-background p-md">
        <h3 className="mb-md whitespace-nowrap text-title-md font-semibold text-foreground sm:text-headline-sm">
          {formatMonth(view.year, view.month)}
        </h3>

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

            return (
              <div
                key={cell.key}
                className={cn(
                  "flex h-11 flex-col items-center justify-center rounded-lg text-label-md",
                  cell.inMonth ? undefined : "text-placeholder/50",
                  cell.inMonth && !selectable && "text-placeholder",
                  selectable && "bg-surface-subtle/60 font-semibold text-primary",
                )}
              >
                <span>{cell.day}</span>
                {selectable ? (
                  <span className="mt-0.5 size-1.5 rounded-full bg-primary" />
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { BookingCalendar }

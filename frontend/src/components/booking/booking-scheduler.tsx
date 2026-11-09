"use client"

import { useState } from "react"
import { BookingCalendar } from "@/components/booking/booking-calendar"
import { BookingSlots } from "@/components/booking/booking-slots"
import type { DateKey } from "@/lib/booking-availability"

type BookingSchedulerProps = {
  today: DateKey
}

function BookingScheduler({ today }: BookingSchedulerProps) {
  const [date, setDate] = useState<DateKey | null>(null)
  const [time, setTime] = useState<string | null>(null)

  function selectDate(next: DateKey) {
    setDate(next)
    setTime(null)
  }

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

      <BookingCalendar today={today} value={date} onChange={selectDate} />

      {date ? (
        <BookingSlots date={date} value={time} onChange={setTime} />
      ) : null}
    </section>
  )
}

export { BookingScheduler }

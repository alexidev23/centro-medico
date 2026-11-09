"use client"

import { useState } from "react"
import { BookingCalendar } from "@/components/booking/booking-calendar"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { BookingPatient } from "@/components/booking/booking-patient"
import { BookingSlots } from "@/components/booking/booking-slots"
import { BookingStepper } from "@/components/booking/booking-stepper"
import { BookingSummary } from "@/components/booking/booking-summary"
import type { DateKey } from "@/lib/booking-availability"
import { EMPTY_PATIENT, type PatientDraft } from "@/lib/booking-patient"
import type { Professional } from "@/lib/professionals"

type BookingFlowProps = {
  today: DateKey
  professional: Professional
}

function BookingFlow({ today, professional }: BookingFlowProps) {
  const [date, setDate] = useState<DateKey | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [patient, setPatient] = useState<PatientDraft>(EMPTY_PATIENT)
  const [confirmed, setConfirmed] = useState(false)

  function selectDate(next: DateKey) {
    setDate(next)
    setTime(null)
  }

  if (confirmed && date && time) {
    return (
      <>
        <BookingStepper current={4} />
        <BookingConfirmation professional={professional} date={date} time={time} />
      </>
    )
  }

  return (
    <>
      <BookingStepper current={date && time ? 3 : 2} />

      <div className="grid items-start gap-lg lg:grid-cols-12">
        <section className="rounded-xl bg-card p-md shadow-card md:p-lg lg:col-span-8">
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

        {date && time ? (
          <div className="lg:col-span-8">
            <BookingPatient value={patient} onChange={setPatient} />
          </div>
        ) : null}

        <div className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-24">
          <BookingSummary
            professional={professional}
            date={date}
            time={time}
            patient={patient}
            onConfirm={() => setConfirmed(true)}
          />
        </div>
      </div>
    </>
  )
}

export { BookingFlow }

import Image from "next/image"
import { CalendarDays, Check, MapPin } from "lucide-react"
import { formatLongDate, type DateKey } from "@/lib/booking-availability"
import type { Professional } from "@/lib/professionals"

type BookingConfirmationProps = {
  professional: Professional
  date: DateKey
  time: string
}

function BookingConfirmation({
  professional,
  date,
  time,
}: BookingConfirmationProps) {
  return (
    <section className="mx-auto w-full max-w-3xl rounded-xl bg-card p-md shadow-card md:p-lg">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-md flex items-center justify-center">
          <span
            className="absolute size-24 rounded-full bg-primary-subtle/60"
            aria-hidden="true"
          />
          <span className="relative flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card">
            <Check className="size-9" strokeWidth={3} aria-hidden="true" />
          </span>
        </div>

        <h2 className="text-headline-lg font-bold tracking-tight text-foreground">
          ¡Turno confirmado con éxito!
        </h2>

        <p className="mt-sm max-w-[32rem] rounded-xl bg-surface-subtle p-sm text-body-sm text-fg-secondary">
          Esta reserva queda solo en esta pantalla: todavía no se envía por WhatsApp ni
          por correo, y no se guardó en ningún sistema.
        </p>
      </div>

      <div className="mt-lg rounded-xl bg-background p-md">
        <div className="mb-md flex flex-wrap items-center justify-between gap-xs">
          <span className="text-label-sm font-semibold tracking-widest text-fg-secondary uppercase">
            Profesional a cargo
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-primary-subtle px-sm py-1 text-label-sm font-semibold text-primary">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            Atención Presencial
          </span>
        </div>

        <div className="flex items-center gap-md">
          <Image
            src={professional.photo}
            alt={professional.alt}
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0">
            <h3 className="text-title-md font-bold text-foreground">
              {professional.name}
            </h3>
            <p className="text-label-md font-semibold text-primary">
              {professional.specialty}
            </p>
            <p className="text-body-sm text-fg-secondary">
              Matrícula Profesional {professional.licence}
            </p>
          </div>
        </div>

        <div className="mt-md flex flex-col gap-sm border-t border-border pt-md">
          <div className="flex items-start gap-sm">
            <CalendarDays
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="text-label-md font-semibold text-foreground">
                {formatLongDate(date)}
              </span>
              <span className="text-body-sm text-fg-secondary">
                Horario puntual: {time} hs
              </span>
            </div>
          </div>

          <div className="flex items-start gap-sm">
            <MapPin
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="text-label-md font-semibold text-foreground">
                {professional.office} — Sede Central Aurora
              </span>
              <span className="text-body-sm text-fg-secondary">
                Av. Hipólito Yrigoyen 480, Nueva Córdoba, Córdoba
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { BookingConfirmation }

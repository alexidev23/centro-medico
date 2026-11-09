import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarDays, Check, Headset, Info, MapPin, MessageCircle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { formatLongDate, type DateKey } from "@/lib/booking-availability"
import type { PatientDraft } from "@/lib/booking-patient"
import type { Professional } from "@/lib/professionals"
import { cn } from "@/lib/utils"

type BookingConfirmationProps = {
  professional: Professional
  date: DateKey
  time: string
  patient: PatientDraft
}

function BookingConfirmation({
  professional,
  date,
  time,
  patient,
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

      <div className="mt-md grid grid-cols-1 gap-md sm:grid-cols-2">
        <div className="rounded-xl bg-background p-md">
          <span className="mb-1 block text-label-sm font-semibold tracking-wider text-fg-secondary uppercase">
            Paciente
          </span>
          <p className="text-title-md font-bold text-foreground">{patient.name}</p>
          <p className="text-body-sm text-fg-secondary">DNI {patient.dni}</p>
        </div>
        <div className="rounded-xl bg-background p-md">
          <span className="mb-1 block text-label-sm font-semibold tracking-wider text-fg-secondary uppercase">
            Cobertura Médica
          </span>
          <p className="text-title-md font-bold text-foreground">
            {patient.insurance}
          </p>
          {patient.affiliate ? (
            <p className="text-body-sm text-fg-secondary">
              Credencial N° {patient.affiliate}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-md flex items-start gap-sm rounded-xl bg-surface-subtle p-md">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-card text-primary shadow-card">
          <Info className="size-5" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <h3 className="text-label-lg font-semibold text-foreground">
            Instrucciones para el día de tu consulta
          </h3>
          <p className="text-body-sm text-fg-secondary">
            Presentate{" "}
            <strong className="font-semibold text-foreground">
              10 minutos antes
            </strong>{" "}
            con tu credencial y DNI. Si necesitás cancelar o reprogramar, escribinos
            por WhatsApp.
          </p>
        </div>
      </div>

      <div className="mt-md flex flex-col gap-sm rounded-xl bg-background p-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-sm">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary">
            <Headset className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-title-md font-bold text-foreground">
              ¿Tenés alguna duda sobre tu cita?
            </h3>
            <p className="text-body-sm text-fg-secondary">
              Escribinos y te respondemos desde la sede de Nueva Córdoba.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/5493515228900"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "primary", size: "sm" }),
            "w-full shrink-0 gap-xs sm:w-auto",
          )}
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Asistencia por WhatsApp
        </a>
      </div>

      <div className="mt-lg flex justify-center">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-xs")}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}

export { BookingConfirmation }

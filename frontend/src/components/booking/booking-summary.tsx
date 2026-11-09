import Image from "next/image"
import { ArrowRight, CalendarDays, Clock, MapPin, ShieldCheck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatLongDate, type DateKey } from "@/lib/booking-availability"
import type { PatientDraft } from "@/lib/booking-patient"
import type { Professional } from "@/lib/professionals"
import { cn } from "@/lib/utils"

type BookingSummaryProps = {
  professional: Professional
  date: DateKey | null
  time: string | null
  patient: PatientDraft
  onConfirm: () => void
}

function BookingSummary({
  professional,
  date,
  time,
  patient,
  onConfirm,
}: BookingSummaryProps) {
  const ready = Boolean(date && time)
  const canConfirm = Boolean(
    date &&
      time &&
      patient.name &&
      patient.dni &&
      patient.phone &&
      patient.email &&
      patient.insurance &&
      patient.accepted,
  )
  const period = time ? (Number(time.slice(0, 2)) < 13 ? "Mañana" : "Tarde") : null

  return (
    <aside className="flex flex-col gap-md rounded-xl bg-card p-md shadow-card md:p-lg">
      <div className="flex flex-wrap items-center justify-between gap-xs pb-xs">
        <span className="flex items-center gap-xs text-label-sm font-bold uppercase tracking-widest text-primary">
          <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
          Resumen en vivo
        </span>
        <span className="rounded-full bg-surface-subtle px-xs py-0.5 text-[12px] font-semibold text-primary">
          {ready ? "Paso 2 listo" : "Paso 2 en curso"}
        </span>
      </div>

      <h3 className="text-headline-sm font-bold leading-tight text-foreground">
        Tu reserva de turno
      </h3>

      <div className="flex items-center gap-sm rounded-xl bg-background p-sm">
        <Image
          src={professional.photo}
          alt={professional.alt}
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <span className="block truncate text-label-md font-bold text-foreground">
            {professional.name}
          </span>
          <span className="block text-[13px] text-primary">
            {professional.specialty}
          </span>
          <span className="block text-[11px] text-fg-secondary">
            {professional.licence}
          </span>
        </div>
      </div>

      <dl className="flex flex-col gap-sm">
        <div className="flex items-start gap-sm">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-primary">
            <CalendarDays className="size-4" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <dt className="text-[12px] text-fg-secondary">Fecha asignada</dt>
            <dd
              className={cn(
                "text-label-md font-bold",
                date ? "text-foreground" : "text-placeholder",
              )}
            >
              {date ? formatLongDate(date) : "Elegí una fecha"}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-sm">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-primary">
            <Clock className="size-4" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <dt className="text-[12px] text-fg-secondary">Horario puntual</dt>
            <dd className="flex items-center gap-xs">
              <span
                className={cn(
                  "font-bold",
                  time ? "text-headline-sm text-primary" : "text-label-md text-placeholder",
                )}
              >
                {time ? `${time} hs` : "Elegí un horario"}
              </span>
              {period ? (
                <span className="rounded bg-surface-subtle px-1.5 py-0.5 text-[11px] font-semibold text-fg-secondary">
                  {period}
                </span>
              ) : null}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-sm">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-primary">
            <MapPin className="size-4" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <dt className="text-[12px] text-fg-secondary">Sede y consultorio</dt>
            <dd className="text-label-md font-semibold text-foreground">
              {professional.office}
            </dd>
            <dd className="text-[13px] text-fg-secondary">
              Av. Hipólito Yrigoyen 480, Nueva Córdoba, Córdoba
            </dd>
          </div>
        </div>

        {patient.insurance ? (
          <div className="flex items-start gap-sm">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-primary">
              <ShieldCheck className="size-4" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <dt className="text-[12px] text-fg-secondary">
                Cobertura médica declarada
              </dt>
              <dd className="text-label-md font-semibold text-foreground">
                {patient.insurance}
              </dd>
              {patient.affiliate ? (
                <dd className="text-[12px] text-fg-secondary">
                  Afiliado N° {patient.affiliate}
                </dd>
              ) : null}
            </div>
          </div>
        ) : null}

        {patient.name || patient.dni ? (
          <div className="flex items-start gap-sm">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-primary">
              <User className="size-4" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <dt className="text-[12px] text-fg-secondary">Paciente titular</dt>
              <dd className="text-label-md font-semibold text-foreground">
                {patient.name || "Sin nombre"}
              </dd>
              {patient.dni ? (
                <dd className="text-[12px] text-fg-secondary">
                  DNI {patient.dni}
                </dd>
              ) : null}
            </div>
          </div>
        ) : null}
      </dl>

      <div className="flex flex-col gap-1.5 border-t border-border pt-md">
        <Button
          type="button"
          onClick={onConfirm}
          disabled={!canConfirm}
          className="group w-full gap-xs"
        >
          Confirmar turno
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Button>
        {canConfirm ? null : (
          <p className="text-[12px] text-fg-secondary">
            Completá los datos obligatorios y aceptá los términos para confirmar.
          </p>
        )}
      </div>
    </aside>
  )
}

export { BookingSummary }

"use client"

import { ChevronDown, CreditCard, IdCard, Mail, Phone, User } from "lucide-react"
import { BookingField } from "@/components/booking/booking-field"
import { Input, inputClassName } from "@/components/ui/input"
import { INSURANCES, type PatientDraft } from "@/lib/booking-patient"
import { cn } from "@/lib/utils"

type BookingPatientProps = {
  value: PatientDraft
  onChange: (next: PatientDraft) => void
}

function BookingPatient({ value, onChange }: BookingPatientProps) {
  function update(patch: Partial<PatientDraft>) {
    onChange({ ...value, ...patch })
  }

  return (
    <section className="rounded-xl bg-card p-md shadow-card md:p-lg">
      <div className="mb-md flex flex-wrap items-start justify-between gap-sm">
        <div className="flex items-center gap-sm">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-label-sm font-bold text-primary">
            3
          </span>
          <div>
            <h2 className="text-title-md font-bold text-foreground">
              Datos del Paciente
            </h2>
            <p className="text-body-sm text-fg-secondary">
              Completá los datos para registrar la reserva médica.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-surface-subtle px-sm py-1 text-[12px] font-semibold text-fg-secondary">
          Campos obligatorios *
        </span>
      </div>

      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        <BookingField
          id="patient-name"
          label="Nombre y Apellido"
          required
          icon={User}
        >
          <Input
            id="patient-name"
            name="name"
            autoComplete="name"
            required
            value={value.name}
            onChange={(event) => update({ name: event.target.value })}
          />
        </BookingField>

        <BookingField
          id="patient-dni"
          label="DNI / Documento"
          required
          icon={IdCard}
        >
          <Input
            id="patient-dni"
            name="dni"
            inputMode="numeric"
            autoComplete="off"
            required
            value={value.dni}
            onChange={(event) => update({ dni: event.target.value })}
          />
        </BookingField>

        <BookingField
          id="patient-phone"
          label="Teléfono Celular"
          required
          icon={Phone}
          hint="Enviaremos recordatorio por WhatsApp 24 hs antes"
        >
          <Input
            id="patient-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={value.phone}
            onChange={(event) => update({ phone: event.target.value })}
          />
        </BookingField>

        <BookingField
          id="patient-email"
          label="Correo Electrónico"
          required
          icon={Mail}
        >
          <Input
            id="patient-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={value.email}
            onChange={(event) => update({ email: event.target.value })}
          />
        </BookingField>

        <BookingField
          id="patient-insurance"
          label="Obra Social o Prepaga"
          required
          icon={ChevronDown}
          hint="Presentá tu credencial digital y DNI al ingresar"
        >
          <select
            id="patient-insurance"
            name="insurance"
            required
            value={value.insurance}
            onChange={(event) => update({ insurance: event.target.value })}
            className={cn(inputClassName, "cursor-pointer appearance-none")}
          >
            <option value="" disabled>
              Elegí tu cobertura
            </option>
            {INSURANCES.map((insurance) => (
              <option key={insurance} value={insurance}>
                {insurance}
              </option>
            ))}
          </select>
        </BookingField>

        <BookingField
          id="patient-affiliate"
          label={
            value.insurance
              ? `Número de credencial ${value.insurance}`
              : "Número de credencial"
          }
          icon={CreditCard}
          hint="Tal como figura en tu credencial"
        >
          <Input
            id="patient-affiliate"
            name="affiliate"
            autoComplete="off"
            value={value.affiliate}
            onChange={(event) => update({ affiliate: event.target.value })}
          />
        </BookingField>
      </div>

      <div className="mt-md">
        <BookingField
          id="patient-reason"
          label="Motivo de la consulta / Síntomas"
          note="Opcional • Confidencial"
        >
          <textarea
            id="patient-reason"
            name="reason"
            rows={3}
            value={value.reason}
            onChange={(event) => update({ reason: event.target.value })}
            placeholder="Contanos brevemente el motivo (ej.: chequeo anual, dolor lumbar recurrente, control de estudios de laboratorio, apto físico)..."
            className={cn(inputClassName, "min-h-24 resize-none py-3")}
          />
        </BookingField>
      </div>

      <label className="mt-sm flex cursor-pointer items-start gap-sm rounded-xl p-sm transition-colors hover:bg-background">
        <input
          type="checkbox"
          name="accepted"
          checked={value.accepted}
          onChange={(event) => update({ accepted: event.target.checked })}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-primary"
        />
        <span className="flex flex-col gap-1">
          <span className="text-label-md text-foreground">
            Acepto los{" "}
            <strong className="font-semibold text-primary">
              Términos del Servicio Médico
            </strong>{" "}
            y la{" "}
            <strong className="font-semibold text-primary">
              Política de Privacidad de Datos
            </strong>
            .
          </span>
          <span className="text-[13px] text-fg-secondary">
            Declaro que la información ingresada es fidedigna y me comprometo a
            avisar con al menos 4 horas de anticipación en caso de cancelación.
          </span>
        </span>
      </label>
    </section>
  )
}

export { BookingPatient }

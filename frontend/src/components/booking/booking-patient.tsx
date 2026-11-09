"use client"

import { IdCard, User } from "lucide-react"
import { BookingField } from "@/components/booking/booking-field"
import { Input } from "@/components/ui/input"
import type { PatientDraft } from "@/lib/booking-patient"

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
      </div>
    </section>
  )
}

export { BookingPatient }

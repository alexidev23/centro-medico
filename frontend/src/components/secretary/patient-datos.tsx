import { coberturaDe, type PacienteDelPadron } from "@/lib/secretary/demo-data"

function PatientDatos({ paciente }: { paciente: PacienteDelPadron }) {
  const filas = [
    {
      etiqueta: "Nacimiento",
      valor: `${paciente.nacimientoTexto} (${paciente.edad} años)`,
    },
    { etiqueta: "Teléfono", valor: paciente.telefono },
    { etiqueta: "Email", valor: paciente.email },
    { etiqueta: "Domicilio", valor: paciente.domicilio },
    { etiqueta: "Cobertura", valor: coberturaDe(paciente) },
  ]

  return (
    <dl className="grid gap-sm rounded-xl border border-surface-subtle bg-card p-md sm:grid-cols-2">
      {filas.map(({ etiqueta, valor }) => (
        <div key={etiqueta} className="flex min-w-0 flex-col gap-0.5">
          <dt className="text-label-sm tracking-wider text-fg-secondary uppercase">
            {etiqueta}
          </dt>
          <dd className="truncate text-label-lg font-semibold text-foreground">
            {valor}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export { PatientDatos }

import { Phone, Users } from "lucide-react"
import type { PacienteDelPadron } from "@/lib/secretary/demo-data"
import { cn, initials } from "@/lib/utils"

const cell = "px-3 py-4 align-top"

function PatientDirectory({ pacientes }: { pacientes: PacienteDelPadron[] }) {
  return (
    <section className="flex flex-col gap-lg rounded-xl border border-surface-subtle bg-card p-lg shadow-card">
      <div className="flex flex-col justify-between gap-md sm:flex-row sm:items-center">
        <div>
          <h1 className="text-title-md font-semibold tracking-tight text-foreground">
            Padrón de Pacientes
          </h1>
          <p className="text-body-sm text-fg-secondary">
            Gestión y búsqueda ágil de historias clínicas activas
          </p>
        </div>
        <span className="flex items-center gap-1.5 self-start rounded-full bg-surface-subtle px-sm py-1 text-label-sm text-fg-secondary">
          <Users className="size-4" aria-hidden="true" />
          {pacientes.length} pacientes
        </span>
      </div>

      <div className="-mx-lg overflow-x-auto px-lg">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="bg-surface-subtle text-label-sm text-fg-secondary">
              <th scope="col" className="rounded-l-lg px-3 py-3 font-semibold">
                Paciente &amp; DNI
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Cobertura
              </th>
              <th scope="col" className="hidden px-3 py-3 font-semibold xl:table-cell">
                Contacto
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Próximo turno
              </th>
              <th scope="col" className="rounded-r-lg px-3 py-3 text-right font-semibold">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-subtle">
            {pacientes.map((paciente) => {
              const { proximo } = paciente

              return (
                <tr
                  key={paciente.id}
                  className="transition-colors hover:bg-primary-subtle/50"
                >
                  <td className={cell}>
                    <div className="flex items-center gap-sm">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-label-md font-bold text-primary">
                        {initials(paciente.nombre)}
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-label-lg font-semibold text-foreground">
                          {paciente.nombre}
                        </span>
                        <span className="text-body-sm whitespace-nowrap text-fg-secondary">
                          DNI {paciente.documento}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className={cell}>
                    <span className="block text-label-md font-semibold text-foreground">
                      {paciente.proveedor}
                    </span>
                    {paciente.plan ? (
                      <span className="block text-body-sm text-fg-secondary">
                        Plan {paciente.plan}
                      </span>
                    ) : null}
                  </td>
                  <td className={cn(cell, "hidden xl:table-cell")}>
                    <span className="flex items-center gap-1.5 text-body-sm whitespace-nowrap text-fg-secondary">
                      <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      {paciente.telefono}
                    </span>
                  </td>
                  <td className={cell}>
                    {proximo ? (
                      <>
                        <span className="block text-label-md font-semibold whitespace-nowrap text-primary">
                          {proximo.cuando}
                        </span>
                        <span className="block text-body-sm text-fg-secondary">
                          {proximo.profesional}
                        </span>
                      </>
                    ) : (
                      <span className="text-body-sm whitespace-nowrap text-fg-secondary">
                        Sin turno agendado
                      </span>
                    )}
                  </td>
                  <td className={cn(cell, "text-right")}>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm whitespace-nowrap",
                        proximo
                          ? "bg-status-confirmed-bg text-status-confirmed-text"
                          : "bg-surface-subtle text-fg-secondary",
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          proximo ? "bg-status-confirmed" : "bg-fg-secondary",
                        )}
                        aria-hidden="true"
                      />
                      {proximo ? "Con turno" : "Sin turno"}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-body-sm text-fg-secondary">
        El estado indica si el paciente tiene un turno agendado esta semana. La
        cobertura se muestra como la informa cada obra social.
      </p>
    </section>
  )
}

export { PatientDirectory }

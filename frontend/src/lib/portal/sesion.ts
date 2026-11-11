import { cookies } from "next/headers"
import { pacientes, type Paciente } from "@/lib/secretary/demo-data"

/**
 * Demo session: the id of a fixture patient and nothing else. It is not a
 * security boundary and must never look like one; there is no auth to back it.
 */
export const COOKIE_PACIENTE = "aurora_paciente"

/** The patient behind the cookie, or `null` when there is no session. */
export async function pacienteActual(): Promise<Paciente | null> {
  const id = (await cookies()).get(COOKIE_PACIENTE)?.value

  return pacientes.find((paciente) => paciente.id === id) ?? null
}

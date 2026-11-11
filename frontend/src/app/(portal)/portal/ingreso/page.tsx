import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { PatientLogin } from "@/components/portal/patient-login"
import { pacienteActual } from "@/lib/portal/sesion"

export const metadata: Metadata = {
  title: "Mi portal · Centro Médico Aurora",
}

// The whole page depends on the session cookie, so there is no shell to
// prerender: the request blocks until the session is known and redirected.
export const instant = false

export default async function PortalIngresoPage() {
  if (await pacienteActual()) redirect("/portal")

  return (
    <div className="flex flex-1 items-center justify-center px-gutter-mobile py-lg md:px-gutter">
      <PatientLogin />
    </div>
  )
}

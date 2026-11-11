"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { pacientes } from "@/lib/secretary/demo-data"
import { COOKIE_PACIENTE } from "@/lib/portal/sesion"

/** Opens a demo session as the chosen fixture patient. */
export async function entrar(formData: FormData) {
  const elegido = pacientes.find((paciente) => paciente.id === formData.get("pacienteId"))

  if (!elegido) redirect("/portal/ingreso")

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_PACIENTE, elegido.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  })

  redirect("/portal")
}

/** Closes the demo session and returns to the public site. */
export async function salir() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_PACIENTE)

  redirect("/")
}

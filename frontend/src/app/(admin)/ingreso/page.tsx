import type { Metadata } from "next"
import { SecretaryLogin } from "@/components/secretary/secretary-login"

export const metadata: Metadata = {
  title: "Ingreso a secretaría · Centro Médico Aurora",
}

export default function IngresoPage() {
  return <SecretaryLogin />
}

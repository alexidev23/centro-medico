import type { Metadata } from "next"
import { BookingStepper } from "@/components/booking/booking-stepper"

export const metadata: Metadata = {
  title: "Sacar turno · Centro Médico Aurora",
}

export default function ReservarPage() {
  return (
    <main className="mx-auto w-full max-w-page px-gutter-mobile py-lg md:px-gutter md:py-xl">
      <BookingStepper current={2} />
    </main>
  )
}

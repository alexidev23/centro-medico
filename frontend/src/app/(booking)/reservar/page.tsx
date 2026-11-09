import type { Metadata } from "next"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { connection } from "next/server"
import { BookingScheduler } from "@/components/booking/booking-scheduler"
import { BookingStepper } from "@/components/booking/booking-stepper"
import { ProfessionalSummary } from "@/components/booking/professional-summary"
import { todayKey } from "@/lib/booking-availability"
import { getProfessionalBySlug } from "@/lib/professionals"

export const metadata: Metadata = {
  title: "Sacar turno · Centro Médico Aurora",
}

async function BookingContent({
  searchParams,
}: Pick<PageProps<"/reservar">, "searchParams">) {
  await connection()
  const { profesional } = await searchParams
  const professional =
    typeof profesional === "string"
      ? getProfessionalBySlug(profesional)
      : undefined

  if (!professional) {
    redirect("/#reservar-turno")
  }

  return (
    <>
      <ProfessionalSummary professional={professional} />
      <BookingScheduler today={todayKey()} professional={professional} />
    </>
  )
}

export default function ReservarPage(props: PageProps<"/reservar">) {
  return (
    <main className="mx-auto flex w-full max-w-page flex-col gap-lg px-gutter-mobile py-lg md:px-gutter md:py-xl">
      <BookingStepper current={2} />
      <Suspense fallback={null}>
        <BookingContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  )
}

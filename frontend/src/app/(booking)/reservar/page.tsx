import type { Metadata } from "next"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { BookingStepper } from "@/components/booking/booking-stepper"
import { ProfessionalSummary } from "@/components/booking/professional-summary"
import { getProfessionalBySlug } from "@/lib/professionals"

export const metadata: Metadata = {
  title: "Sacar turno · Centro Médico Aurora",
}

async function ProfessionalBanner({
  searchParams,
}: Pick<PageProps<"/reservar">, "searchParams">) {
  const { profesional } = await searchParams
  const professional =
    typeof profesional === "string"
      ? getProfessionalBySlug(profesional)
      : undefined

  if (!professional) {
    redirect("/#reservar-turno")
  }

  return <ProfessionalSummary professional={professional} />
}

export default function ReservarPage(props: PageProps<"/reservar">) {
  return (
    <main className="mx-auto flex w-full max-w-page flex-col gap-lg px-gutter-mobile py-lg md:px-gutter md:py-xl">
      <BookingStepper current={2} />
      <Suspense fallback={null}>
        <ProfessionalBanner searchParams={props.searchParams} />
      </Suspense>
    </main>
  )
}

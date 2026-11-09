import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Panel de secretaría · Centro Médico Aurora",
}

export default function PanelPage() {
  return (
    <section className="w-full max-w-[32rem] rounded-xl bg-card p-lg text-center shadow-card">
      <h1 className="text-headline-md font-bold text-foreground">
        Panel de secretaría
      </h1>
      <p className="mt-sm text-body-md text-fg-secondary">
        Esta pantalla todavía no está construida. El dashboard, la agenda, los
        pacientes y los profesionales llegan en las próximas etapas.
      </p>
      <Link
        href="/ingreso"
        className={cn(buttonVariants({ variant: "secondary" }), "mt-md")}
      >
        Volver al ingreso
      </Link>
    </section>
  )
}

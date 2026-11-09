import Image from "next/image"
import Link from "next/link"
import { CircleCheck, RefreshCw } from "lucide-react"
import type { Professional } from "@/lib/professionals"

type ProfessionalSummaryProps = {
  professional: Professional
}

function ProfessionalSummary({ professional }: ProfessionalSummaryProps) {
  return (
    <section className="rounded-xl bg-card p-md shadow-card md:p-lg">
      <div className="flex flex-col gap-md md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-md">
          <div className="relative shrink-0">
            <Image
              src={professional.photo}
              alt={professional.alt}
              width={64}
              height={64}
              className="size-16 rounded-xl object-cover shadow-card"
            />
            <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CircleCheck className="size-3.5" aria-hidden="true" />
            </span>
          </div>
          <div className="flex min-w-0 flex-col">
            <div className="flex flex-wrap items-center gap-xs">
              <span className="rounded-full bg-surface-subtle px-xs py-0.5 text-[12px] font-semibold text-primary">
                {professional.specialty}
              </span>
              <span className="text-[12px] text-fg-secondary">
                {professional.licence}
              </span>
            </div>
            <h2 className="text-headline-sm font-bold text-foreground">
              {professional.name}
            </h2>
            <span className="text-body-sm text-fg-secondary">
              Sede Nueva Córdoba · {professional.office}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-sm md:justify-end">
          <div className="hidden text-right sm:block">
            <span className="block text-[12px] text-fg-secondary">
              Duración de consulta
            </span>
            <span className="text-label-md font-bold text-primary">
              30 minutos presencial
            </span>
          </div>
          <Link
            href="/#reservar-turno"
            className="flex items-center gap-xs rounded-xl bg-surface-subtle px-md py-xs text-label-md text-primary transition-colors hover:bg-secondary"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Cambiar profesional
          </Link>
        </div>
      </div>
    </section>
  )
}

export { ProfessionalSummary }

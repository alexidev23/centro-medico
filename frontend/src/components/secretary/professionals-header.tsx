import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

function ProfessionalsHeader({ gestion }: { gestion: number }) {
  return (
    <section className="flex flex-wrap items-start justify-between gap-md">
      <div className="flex min-w-0 flex-col">
        <p className="flex flex-wrap items-center gap-2 text-label-sm text-fg-secondary">
          <span>Modo demo • Gestión {gestion}</span>
          <span aria-hidden="true">•</span>
          <span>Sede Nueva Córdoba</span>
        </p>
        <h1 className="mt-1 text-headline-sm font-bold tracking-tight text-foreground">
          Cuerpo Profesional y Consultorios
        </h1>
        <p className="mt-1 max-w-[56ch] text-body-sm text-fg-secondary">
          Control integral de turnos médicos, asignación de gabinetes y monitoreo
          de presencia en tiempo real del equipo de salud.
        </p>
      </div>

      {/* A real route: the weekly grid already exists at /agenda. */}
      <Link href="/agenda" className={buttonVariants({ variant: "secondary", size: "sm" })}>
        <CalendarDays aria-hidden="true" />
        Vista Grilla de Turnos
      </Link>
    </section>
  )
}

export { ProfessionalsHeader }

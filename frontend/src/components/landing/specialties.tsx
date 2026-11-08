import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, Baby, Brain, Salad, Sparkles, Stethoscope, Venus } from "lucide-react"

type Specialty = {
  name: string
  description: string
  tag: string
  Icon: LucideIcon
}

const SPECIALTIES: Specialty[] = [
  {
    name: "Clínica Médica",
    description:
      "Atención integral, prevención y chequeos anuales para adultos.",
    tag: "Adultos",
    Icon: Stethoscope,
  },
  {
    name: "Pediatría",
    description:
      "Cuidado del crecimiento, control del recién nacido y vacunas en un entorno contenedor.",
    tag: "0 a 16 años",
    Icon: Baby,
  },
  {
    name: "Ginecología",
    description:
      "Salud integral de la mujer y controles preventivos de rutina con calidez profesional.",
    tag: "Integral",
    Icon: Venus,
  },
  {
    name: "Dermatología",
    description:
      "Diagnóstico clínico, control de lunares y cuidado de la piel en niños y adultos.",
    tag: "Clínica & Estética",
    Icon: Sparkles,
  },
  {
    name: "Psicología",
    description:
      "Espacio terapéutico cálido, seguro y confidencial orientado a la escucha activa.",
    tag: "Terapia",
    Icon: Brain,
  },
  {
    name: "Nutrición",
    description:
      "Planes alimentarios personalizados y educación nutricional para hábitos sostenibles.",
    tag: "Hábitos",
    Icon: Salad,
  },
]

function SpecialtyCard({ name, description, tag, Icon }: Specialty) {
  return (
    <article className="flex flex-col gap-sm rounded-lg bg-card p-md shadow-card transition-shadow hover:shadow-raised md:gap-md md:p-lg">
      <div className="flex items-start justify-between gap-sm">
        <div className="flex items-center gap-sm">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-primary md:size-12">
            <Icon className="size-5 md:size-6" aria-hidden="true" />
          </span>
          <h3 className="text-title-md font-bold text-foreground md:text-headline-sm">
            {name}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-surface-subtle px-2 py-0.5 text-label-sm text-primary md:hidden">
          {tag}
        </span>
      </div>
      <p className="text-body-sm text-fg-secondary md:text-body-md">
        {description}
      </p>
      <Link
        href="#reservar-turno"
        className="mt-auto inline-flex items-center gap-1 text-label-md font-semibold text-primary hover:text-primary-dark"
      >
        Ver turnos disponibles
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  )
}

function Specialties() {
  return (
    <section
      id="especialidades"
      className="w-full bg-surface-subtle/40 py-lg md:bg-transparent md:py-xl"
    >
      <div className="mx-auto flex w-full max-w-page flex-col gap-md px-gutter-mobile md:gap-lg md:px-gutter">
        <div className="flex flex-col gap-xs">
          <span className="text-label-sm font-semibold tracking-wider text-primary uppercase">
            Especialidades médicas
          </span>
          <h2 className="text-title-md font-bold tracking-tight text-foreground md:text-headline-lg">
            Cuidado integral para cada etapa
          </h2>
          <p className="max-w-xl text-body-sm text-fg-secondary md:text-body-md">
            Enfoque preventivo, seguimiento coordinado y consultorios equipados en
            un único lugar.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-sm md:grid-cols-2 md:gap-lg lg:grid-cols-3">
          {SPECIALTIES.map((specialty) => (
            <SpecialtyCard key={specialty.name} {...specialty} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Specialties }

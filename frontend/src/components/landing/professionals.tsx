import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { PROFESSIONALS, type Professional } from "@/lib/professionals"

function ProfessionalCard({
  slug,
  name,
  specialty,
  licence,
  office,
  photo,
  alt,
}: Professional) {
  return (
    <article className="flex flex-col justify-between gap-md rounded-lg bg-card p-md shadow-card md:p-lg">
      <div className="flex flex-col gap-md">
        <div className="relative h-48 w-full overflow-hidden rounded-lg bg-surface-subtle">
          <Image
            src={photo}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-title-md font-bold text-foreground md:text-headline-sm">
            {name}
          </h3>
          <span className="text-label-lg text-primary">{specialty}</span>
          <div className="mt-xs flex items-center justify-between text-body-sm text-fg-secondary">
            <span>{licence}</span>
            <span>{office}</span>
          </div>
        </div>
      </div>
      <Link
        href={`/reservar?profesional=${slug}`}
        className={buttonVariants({ className: "w-full" })}
      >
        Pedir turno
      </Link>
    </article>
  )
}

function Professionals() {
  return (
    <section id="profesionales" className="w-full py-lg md:py-xl">
      <div className="mx-auto flex w-full max-w-page flex-col gap-md px-gutter-mobile md:gap-lg md:px-gutter">
        <div className="flex flex-col gap-xs">
          <span className="text-label-sm font-semibold tracking-wider text-primary uppercase">
            Cuerpo Médico
          </span>
          <h2 className="text-title-md font-bold tracking-tight text-foreground md:text-headline-lg">
            Nuestros profesionales
          </h2>
          <p className="max-w-[36rem] text-body-sm text-fg-secondary md:text-body-md">
            Atención con dedicación exclusiva, rigor clínico y vocación de
            servicio.
          </p>
        </div>
        <div
          id="reservar-turno"
          className="grid scroll-mt-20 grid-cols-1 gap-sm md:grid-cols-2 md:gap-lg md:scroll-mt-24 lg:grid-cols-3"
        >
          {PROFESSIONALS.map((professional) => (
            <ProfessionalCard key={professional.name} {...professional} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Professionals }

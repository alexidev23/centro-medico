import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Flower2,
  ShieldCheck,
  Stethoscope,
} from "lucide-react"
import { cn } from "cn"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

const FACILITIES_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAVnICw8_fC0z3cRm363YI2vdKzxJWMQru1hm7R6ATVHTZkMholGhfW9mToIdMg3YGbJXs9SbytPNgickbvbCJjGiPp91aBoKVXS_d9Qo0cP1ecQWwQnQa-zmkTJB0s_Acl5TYW-MaScPjbLxcHv36EjjpWFTLYJJqfENMGmyFeDrLeMqfBg9vicrkOpIBtrIna8VPUXHVeZJu4meXsqSxkQ26ZyiOHxiNwXdgpI924lgCBdZy1pWA7"

function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-page flex-col gap-lg px-gutter-mobile pt-md pb-lg md:grid md:grid-cols-12 md:gap-x-xl md:gap-y-lg md:px-gutter md:pt-xl md:pb-xl">
      <div className="flex flex-col gap-sm md:col-span-7 md:row-start-1 md:justify-center">
        <Badge variant="brand" className="self-start">
          <ShieldCheck className="size-4" />
          Centro Médico en Nueva Córdoba
        </Badge>
        <h1 className="text-headline-lg-mobile tracking-tight text-foreground md:text-headline-lg">
          Atención médica humana, cercana y sin esperas innecesarias
        </h1>
        <p className="text-body-md text-fg-secondary">
          Tu salud y la de tu familia en el corazón de Nueva Córdoba. Profesionales
          dedicados, turnos puntuales e instalaciones pensadas para tu bienestar.
        </p>
      </div>

      <div className="flex flex-col gap-sm md:col-span-7 md:row-start-2 md:flex-row">
        <Link
          href="#especialidades"
          className={cn(buttonVariants({ variant: "primary" }), "w-full md:w-auto")}
        >
          <CalendarDays className="size-5" />
          Sacar turno online
        </Link>
        <Link
          href="#especialidades"
          className={cn(buttonVariants({ variant: "secondary" }), "w-full md:w-auto")}
        >
          <Stethoscope className="size-5" />
          Ver especialidades
        </Link>
      </div>

      <article className="flex flex-col gap-sm rounded-lg bg-card p-md shadow-card md:col-span-5 md:row-start-1">
        <div className="flex items-center justify-between gap-sm">
          <Badge variant="confirmed">
            <BadgeDot className="animate-pulse" />
            Disponible hoy
          </Badge>
          <span className="text-label-sm text-muted-foreground">
            Sin costo adicional
          </span>
        </div>
        <div className="flex items-start gap-sm">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-primary">
            <Stethoscope className="size-5" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-label-lg font-bold text-foreground">
              Clínica Médica · Hoy 16:30 hs
            </span>
            <span className="text-body-sm text-fg-secondary">
              Dra. Sofía Ramírez (M.P. 34.892)
            </span>
          </div>
        </div>
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-full bg-surface-subtle hover:bg-muted"
          )}
        >
          Reservar este turno
          <ArrowRight className="size-4" />
        </button>
      </article>

      <div className="relative h-56 w-full overflow-hidden rounded-lg md:col-span-5 md:row-start-2 md:h-64">
        <Image
          src={FACILITIES_IMAGE}
          alt="Instalaciones del Centro Médico Aurora en Nueva Córdoba"
          fill
          sizes="(min-width: 768px) 42vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-end bg-linear-to-t from-foreground/60 via-transparent to-transparent p-md">
          <p className="flex items-center gap-1 text-label-sm text-primary-foreground">
            <Flower2 className="size-4" />
            Espacios diseñados para tu tranquilidad y confort
          </p>
        </div>
      </div>
    </section>
  )
}

export { Hero }

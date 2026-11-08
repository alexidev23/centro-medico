import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
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

function MobileAppointmentCard() {
  return (
    <article className="flex flex-col gap-sm rounded-lg bg-card p-md shadow-card lg:hidden">
      <div className="flex items-center justify-between gap-sm">
        <Badge variant="confirmed">
          <BadgeDot className="animate-pulse" />
          Disponible hoy
        </Badge>
        <span className="text-label-sm text-muted-foreground">Sin costo adicional</span>
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
      <Link
        href="#reservar-turno"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "w-full bg-surface-subtle hover:bg-muted"
        )}
      >
        Reservar este turno
        <ArrowRight className="size-4" />
      </Link>
    </article>
  )
}

function DesktopAppointmentCard() {
  return (
    <article className="hidden flex-col gap-sm rounded-lg bg-card p-lg shadow-raised lg:flex">
      <div className="flex items-center justify-between gap-sm">
        <span className="rounded-full bg-surface-subtle px-sm py-xs text-label-sm text-primary">
          Próximo turno disponible hoy
        </span>
        <span className="flex items-center gap-1 text-label-sm text-primary">
          <span className="size-2 rounded-full bg-primary" />
          Jueves 15 de octubre
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-title-md text-foreground">
          Clínica Médica • Hoy 16:30 hs
        </span>
        <span className="text-body-md text-fg-secondary">
          Dra. Sofía Ramírez (M.P. 34.892) • Consultorio 3
        </span>
      </div>
      <Link
        href="#reservar-turno"
        className={cn(buttonVariants({ variant: "primary" }), "w-full")}
      >
        Reservar este horario
      </Link>
    </article>
  )
}

function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-page flex-col gap-lg px-gutter-mobile pt-md pb-lg lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-xl lg:gap-y-lg lg:px-gutter lg:pt-xl lg:pb-xl">
      <div className="flex flex-col gap-sm lg:col-span-7 lg:gap-md">
        <Badge variant="brand" className="self-start lg:hidden">
          <ShieldCheck className="size-4" />
          Centro Médico en Nueva Córdoba
        </Badge>
        <div className="hidden items-center gap-xs self-start rounded-full bg-surface-subtle px-md py-xs text-primary shadow-card lg:inline-flex">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          <span className="text-label-sm tracking-wide">
            Centro Médico en Nueva Córdoba
          </span>
        </div>
        <h1 className="text-headline-lg-mobile tracking-tight text-foreground lg:text-headline-lg">
          Atención médica humana, cercana y sin esperas innecesarias
        </h1>
        <p className="text-body-md text-fg-secondary lg:max-w-[42rem] lg:text-body-lg">
          Tu salud y la de tu familia en el corazón de Nueva Córdoba. Profesionales
          dedicados, turnos puntuales e instalaciones pensadas para tu bienestar.
        </p>
        <div className="mt-md flex flex-col gap-sm lg:mt-0 lg:flex-row lg:flex-wrap lg:items-center lg:gap-md lg:pt-xs">
          <Link
            href="#reservar-turno"
            className={cn(buttonVariants({ variant: "primary" }), "w-full lg:w-auto")}
          >
            <CalendarDays className="size-5" />
            Sacar turno online
          </Link>
          <Link
            href="#especialidades"
            className={cn(buttonVariants({ variant: "secondary" }), "w-full lg:w-auto")}
          >
            <Stethoscope className="size-5" />
            Ver especialidades
          </Link>
        </div>
        <p className="hidden items-center gap-sm pt-sm text-body-sm text-fg-secondary lg:flex">
          <CalendarCheck className="size-5 text-primary" />
          Sistema actualizado para el jueves 15 de octubre de 2026
        </p>
      </div>

      <div className="flex flex-col-reverse gap-lg lg:col-span-5 lg:flex-col lg:gap-md">
        <div className="relative h-56 w-full overflow-hidden rounded-lg lg:h-80">
          <Image
            src={FACILITIES_IMAGE}
            alt="Instalaciones del Centro Médico Aurora en Nueva Córdoba"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-end bg-linear-to-t from-foreground/60 via-transparent to-transparent p-md">
            <p className="flex items-center gap-1 text-label-sm text-primary-foreground lg:text-label-md">
              <Flower2 className="size-4" />
              Espacios diseñados para tu tranquilidad y confort
            </p>
          </div>
        </div>
        <MobileAppointmentCard />
        <DesktopAppointmentCard />
      </div>
    </section>
  )
}

export { Hero }

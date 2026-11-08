import Image from "next/image"
import { Clock, MapPin, MessageCircle, Pin } from "lucide-react"
import { cn } from "cn"
import { buttonVariants } from "@/components/ui/button"

const LOCATION_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCInVftdk5VTWn0OWMrOp1mDU_fSawUM5yhn-SSulOKjrXS_ZHDd_PcPJ4nMm8mByu-8CYrDlLsIAkYHbeE9Zt7_nKk9tYWiRsI2NH3KMYmEolmYPL9IEasE50XrFbx2hRO4nPy-unvnS7lMjUDmIwGGuQV64cUZSXF4GIQJF2pa3sZatsL0O1GISJFoK5DJfXmY0dHqxt_dOTGOixK76MxnWo4GRy7qkvpzpBNvFPmuKRhBP8Wvoln"

function Contact() {
  return (
    <section
      id="contacto"
      className="w-full scroll-mt-20 py-lg md:scroll-mt-24 md:py-xl"
    >
      <div className="mx-auto grid w-full max-w-page grid-cols-1 items-center gap-xl px-gutter-mobile md:px-gutter lg:grid-cols-12">
        <div className="flex flex-col gap-lg lg:col-span-6">
          <div className="flex flex-col gap-xs">
            <span className="text-label-sm font-semibold tracking-wider text-primary uppercase">
              Ubicación estratégica
            </span>
            <h2 className="text-title-md font-bold tracking-tight text-foreground md:text-headline-lg">
              Vení a visitarnos
            </h2>
            <p className="text-body-sm text-fg-secondary md:text-body-md">
              Acceso sencillo y cómodo transporte urbano en Nueva Córdoba.
            </p>
          </div>

          <div className="flex flex-col gap-md">
            <div className="flex items-start gap-sm">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-primary">
                <MapPin className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="text-title-md text-foreground">Sede única</span>
                <span className="text-body-sm text-fg-secondary md:text-body-md">
                  Av. Hipólito Yrigoyen 480, Nueva Córdoba, Córdoba Capital
                </span>
                <span className="mt-xs text-body-sm text-primary">
                  A 2 cuadras del Paseo del Buen Pastor
                </span>
              </div>
            </div>
            <div className="flex items-start gap-sm">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-primary">
                <Clock className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="text-title-md text-foreground">
                  Horarios de atención
                </span>
                <span className="text-body-sm text-fg-secondary md:text-body-md">
                  Lunes a viernes de 07:30 a 20:30 hs
                </span>
                <span className="text-body-sm text-fg-secondary md:text-body-md">
                  Sábados de 08:00 a 13:00 hs
                </span>
              </div>
            </div>
          </div>

          <div>
            <a
              href="https://wa.me/5493515228900"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "primary" }),
                "h-14 w-full gap-sm px-md shadow-card sm:w-auto sm:px-xl"
              )}
            >
              <MessageCircle className="size-5 shrink-0" />
              <span>
                Escribir por WhatsApp
                <span className="hidden sm:inline"> (+54 351 522-8900)</span>
              </span>
            </a>
          </div>
        </div>

        <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-card lg:col-span-6 lg:h-96">
          <Image
            src={LOCATION_IMAGE}
            alt="Mapa de la ubicación del Centro Médico Aurora en Nueva Córdoba"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/10" />
          <div className="absolute inset-x-md bottom-md flex items-center justify-between gap-sm rounded-xl bg-card/95 p-md shadow-raised backdrop-blur-sm">
            <div className="flex items-center gap-sm">
              <Pin className="size-5 shrink-0 text-primary" />
              <div className="flex flex-col">
                <span className="text-label-lg text-foreground">
                  Hipólito Yrigoyen 480
                </span>
                <span className="text-body-sm text-fg-secondary">
                  Nueva Córdoba • Córdoba
                </span>
              </div>
            </div>
            <span className="hidden rounded-full bg-surface-subtle px-sm py-xs text-label-sm text-primary sm:inline">
              Marcador oficial
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Contact }

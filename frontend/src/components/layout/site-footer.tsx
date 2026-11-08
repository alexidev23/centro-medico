import { Clock, MapPin, MessageCircle, Phone } from "lucide-react"
import { BrandMark } from "@/components/layout/brand-mark"

function SiteFooter() {
  return (
    <footer className="mt-xl w-full border-t border-border/60 bg-card pt-xl pb-28 md:pb-xl">
      <div className="mx-auto w-full max-w-page px-gutter-mobile md:px-gutter">
        <div className="grid grid-cols-1 gap-lg md:grid-cols-12 md:gap-xl">
          <div className="flex flex-col gap-sm md:col-span-5">
            <div className="flex items-center gap-sm">
              <BrandMark />
              <span className="text-headline-sm font-bold tracking-tight text-primary">
                Centro Médico Aurora
              </span>
            </div>
            <p className="max-w-[24rem] text-body-sm text-fg-secondary md:text-body-md">
              Un entorno cálido y moderno de salud integral y precisión clínica
              en la ciudad de Córdoba. Estamos para cuidarte.
            </p>
          </div>

          <div className="flex flex-col gap-sm md:col-span-4">
            <span className="text-label-lg text-foreground">
              Sede Central &amp; Atención
            </span>
            <div className="flex items-start gap-xs text-body-sm text-fg-secondary">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <span>Av. Hipólito Yrigoyen 480, Nueva Córdoba, Córdoba</span>
            </div>
            <div className="flex items-start gap-xs text-body-sm text-fg-secondary">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
              <span>
                Lunes a Viernes: 07:30 a 20:30 hs
                <br />
                Sábados: 08:00 a 13:00 hs
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-sm md:col-span-3">
            <span className="text-label-lg text-foreground">
              Contacto Directo
            </span>
            <a
              href="https://wa.me/5493515228900"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-xs text-body-sm text-fg-secondary transition-colors hover:text-primary"
            >
              <MessageCircle className="size-5 shrink-0 text-primary" />
              <span>WhatsApp: +54 9 351 522-8900</span>
            </a>
            <a
              href="tel:+543514859100"
              className="flex items-center gap-xs text-body-sm text-fg-secondary transition-colors hover:text-primary"
            >
              <Phone className="size-5 shrink-0 text-primary" />
              <span>Teléfono: (0351) 485-9100</span>
            </a>
          </div>
        </div>

        <div className="mt-xl flex flex-col items-center justify-between gap-sm border-t border-border/60 pt-lg text-body-sm text-muted-foreground sm:flex-row">
          <span>Proyecto demo. Datos ficticios.</span>
          <span>Córdoba, Argentina</span>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }

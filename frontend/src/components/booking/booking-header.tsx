import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { BrandMark } from "@/components/layout/brand-mark"

const ICON_BUTTON =
  "flex size-11 items-center justify-center rounded-full text-fg-secondary transition-colors hover:bg-surface-subtle"

function BookingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-card/90 shadow-card backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-gutter-mobile md:hidden">
        <div className="flex items-center gap-xs">
          <Link href="/" aria-label="Volver" className={ICON_BUTTON}>
            <ArrowLeft className="size-6" />
          </Link>
          <span className="text-title-md text-foreground">Reservar Turno</span>
        </div>
        <Link href="/" aria-label="Cerrar el flujo de reserva" className={ICON_BUTTON}>
          <X className="size-5" />
        </Link>
      </div>

      <div className="mx-auto hidden h-20 w-full max-w-page items-center justify-between gap-sm px-gutter md:flex">
        <Link href="/" className="flex min-w-0 items-center gap-sm">
          <BrandMark />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-title-md font-bold tracking-tight text-primary">
              Centro Médico Aurora
            </span>
            <span className="truncate text-[12px] leading-none text-fg-secondary">
              Nueva Córdoba · Sanatorio Boutique
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-md">
          <div className="flex flex-col text-right">
            <span className="text-label-sm font-semibold text-foreground">
              (0351) 482-9000
            </span>
            <span className="text-[12px] text-fg-secondary">
              Guardia y Central Telefónica
            </span>
          </div>
          <Link
            href="/"
            className="text-label-sm text-fg-secondary transition-colors hover:text-destructive"
          >
            Cancelar proceso
          </Link>
        </div>
      </div>
    </header>
  )
}

export { BookingHeader }

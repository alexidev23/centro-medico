"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, MessageCircle, Phone, User } from "lucide-react"
import { cn } from "cn"
import { BrandMark } from "@/components/layout/brand-mark"
import { SiteDrawer } from "@/components/layout/site-drawer"
import { buttonVariants } from "@/components/ui/button"

const ICON_LINK =
  "flex size-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-subtle"

const NAV_ITEMS = [
  { label: "Inicio", href: "/", active: true },
  { label: "Especialidades", href: "#especialidades", active: false },
  { label: "Profesionales", href: "#profesionales", active: false },
  { label: "Contacto", href: "#contacto", active: false },
]

function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-background/90 shadow-card backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between gap-sm px-gutter-mobile md:h-20 md:gap-md md:px-gutter">
          <div className="flex min-w-0 items-center gap-sm">
            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="site-drawer"
              onClick={() => setOpen(true)}
              className="flex size-11 items-center justify-center rounded-xl text-primary transition-colors hover:bg-surface-subtle md:hidden"
            >
              <Menu className="size-6" />
            </button>
            <Link href="/" className="flex min-w-0 items-center gap-sm">
              <BrandMark />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-title-md font-bold tracking-tight text-primary md:text-headline-sm">
                  Centro Médico Aurora
                </span>
                <span className="truncate text-label-sm tracking-wider text-muted-foreground uppercase">
                  Salud Integral · Córdoba
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-sm md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "rounded-xl px-md py-sm text-label-lg transition-colors",
                  item.active
                    ? "bg-surface-subtle text-primary"
                    : "text-fg-secondary hover:bg-surface-subtle hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-xs md:gap-md">
            <a
              href="https://wa.me/5493515228900"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp"
              className={cn(ICON_LINK, "md:hidden")}
            >
              <MessageCircle className="size-5" />
            </a>
            <a
              href="tel:+543514859100"
              aria-label="Llamar al centro médico"
              className={cn(ICON_LINK, "md:hidden")}
            >
              <Phone className="size-5" />
            </a>
            <Link
              href="#reservar-turno"
              className={cn(
                buttonVariants({ variant: "primary" }),
                "hidden md:inline-flex"
              )}
            >
              Sacar turno
            </Link>
            <button
              type="button"
              aria-label="Portal del paciente"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              <User className="size-4" />
            </button>
          </div>
        </div>
      </header>
      <SiteDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export { SiteHeader }

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, MessageCircle, Phone, User } from "lucide-react"
import { BrandMark } from "@/components/layout/brand-mark"
import { SiteDrawer } from "@/components/layout/site-drawer"

const ICON_LINK =
  "flex size-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-subtle"

function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between gap-sm px-gutter-mobile">
          <div className="flex min-w-0 items-center gap-sm">
            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="site-drawer"
              onClick={() => setOpen(true)}
              className="flex size-11 items-center justify-center rounded-xl text-primary transition-colors hover:bg-surface-subtle"
            >
              <Menu className="size-6" />
            </button>
            <Link href="/" className="flex min-w-0 items-center gap-sm">
              <BrandMark />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-label-md font-semibold text-foreground">
                  Centro Médico Aurora
                </span>
                <span className="truncate text-label-sm font-medium text-primary">
                  Inicio
                </span>
              </span>
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-xs">
            <a
              href="https://wa.me/543515550188"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp"
              className={ICON_LINK}
            >
              <MessageCircle className="size-5" />
            </a>
            <a
              href="tel:+543515550188"
              aria-label="Llamar al centro médico"
              className={ICON_LINK}
            >
              <Phone className="size-5" />
            </a>
            <button
              type="button"
              aria-label="Portal del paciente"
              className={ICON_LINK}
            >
              <User className="size-5" />
            </button>
          </div>
        </div>
      </header>
      <SiteDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export { SiteHeader }

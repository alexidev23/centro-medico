"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CircleHelp, Headset, Home, MapPin, Stethoscope, Users, X } from "lucide-react"
import { cn } from "cn"
import { BrandMark } from "@/components/layout/brand-mark"

const navigation = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Especialidades", href: "#especialidades", icon: Stethoscope },
  { label: "Profesionales", href: "#profesionales", icon: Users },
  { label: "Cómo funciona", href: "#como-funciona", icon: CircleHelp },
  { label: "Ubicación", href: "#", icon: MapPin },
  { label: "Contacto", href: "#", icon: Headset },
]

function SiteDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-foreground/40 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        id="site-drawer"
        aria-label="Menú principal"
        inert={!open}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[84%] max-w-[340px] flex-col justify-between overflow-y-auto bg-card shadow-overlay transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col gap-lg p-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <BrandMark />
              <div className="flex flex-col">
                <span className="text-label-md font-semibold text-foreground">Aurora Salud</span>
                <span className="text-label-sm text-muted-foreground">Córdoba Capital</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={onClose}
              className="flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-surface-subtle"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-surface-subtle p-md">
            <p className="text-label-sm text-muted-foreground">Atención telefónica y WhatsApp</p>
            <p className="text-title-md font-bold text-primary">+54 351 522-8900</p>
            <p className="text-body-sm text-fg-secondary">Lun a Vie 07:30 a 20:30 · Sáb 08:00 a 13:00</p>
          </div>

          <nav className="flex flex-col gap-xs">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex h-12 items-center gap-md rounded-xl px-md text-foreground transition-colors hover:bg-surface-subtle"
              >
                <item.icon className="size-5 text-primary" />
                <span className="text-label-lg">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="bg-surface-subtle/60 p-lg">
          <p className="text-label-sm font-medium text-muted-foreground">
            Av. Hipólito Yrigoyen 480, Nueva Córdoba
          </p>
          <p className="text-body-sm text-fg-secondary">Cuidado cálido, medicina de excelencia.</p>
        </div>
      </aside>
    </>
  )
}

export { SiteDrawer }

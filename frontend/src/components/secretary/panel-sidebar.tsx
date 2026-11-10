"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDays,
  Hospital,
  LayoutGrid,
  Stethoscope,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  { label: "Inicio", href: "/panel", icon: LayoutGrid, ready: true },
  { label: "Agenda", href: "/agenda", icon: CalendarDays, ready: true },
  { label: "Pacientes", href: "/pacientes", icon: Users, ready: true },
  { label: "Profesionales", href: "/profesionales", icon: Stethoscope, ready: true },
]

const itemClassName =
  "flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg px-3 text-label-md whitespace-nowrap transition-colors"

function PanelSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex shrink-0 flex-col border-b border-surface-subtle bg-card lg:sticky lg:top-0 lg:h-dvh lg:w-[17rem] lg:border-r lg:border-b-0">
      <div className="flex items-center gap-sm px-md py-sm lg:py-md">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Hospital className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <span className="block truncate text-title-md font-bold tracking-tight text-foreground">
            Centro Aurora
          </span>
          <span className="block text-label-sm text-fg-secondary">
            Secretaría Médica
          </span>
        </div>
      </div>

      <nav className="flex flex-wrap gap-1 px-sm pb-sm lg:flex-1 lg:flex-col lg:overflow-visible lg:px-sm lg:py-2">
        {sections.map(({ label, href, icon: Icon, ready }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)

          if (!ready) {
            return (
              <span
                key={href}
                aria-disabled="true"
                title="Llega en una próxima etapa"
                className={cn(itemClassName, "text-fg-secondary opacity-60")}
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                {label}
              </span>
            )
          }

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                itemClassName,
                active
                  ? "bg-primary-subtle font-semibold text-primary"
                  : "text-fg-secondary hover:bg-surface-subtle hover:text-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="hidden border-t border-surface-subtle px-md py-sm text-label-sm text-fg-secondary lg:block">
        Sede Nueva Córdoba
      </div>
    </aside>
  )
}

export { PanelSidebar }

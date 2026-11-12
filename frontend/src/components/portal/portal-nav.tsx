"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * The portal's tabs. Each one is a route, not client state, so it has a URL and
 * the back button works. Only tabs that exist are listed: an empty tab is the
 * same lie as a button without a handler.
 */
const tabs = [
  { href: "/portal", label: "Inicio" },
  { href: "/portal/turnos", label: "Turnos" },
  { href: "/portal/recetas", label: "Recetas" },
] as const

export function PortalNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Secciones del portal" className="border-t border-surface-subtle">
      <ul className="mx-auto flex w-full max-w-[52rem] gap-xs overflow-x-auto px-gutter-mobile md:px-gutter">
        {tabs.map((tab) => {
          const activo =
            tab.href === "/portal"
              ? pathname === "/portal"
              : pathname.startsWith(tab.href)

          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={activo ? "page" : undefined}
                className={
                  "inline-flex h-11 items-center border-b-2 px-sm text-label-md transition-colors " +
                  (activo
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-fg-secondary hover:text-foreground")
                }
              >
                {tab.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

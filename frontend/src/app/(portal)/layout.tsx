import type { ReactNode } from "react"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { BrandMark } from "@/components/layout/brand-mark"
import { salir } from "@/lib/portal/acciones"
import { pacienteActual } from "@/lib/portal/sesion"

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const paciente = await pacienteActual()

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-surface-subtle bg-card">
        <div className="mx-auto flex h-16 w-full max-w-[52rem] items-center justify-between gap-sm px-gutter-mobile md:px-gutter">
          <Link href="/" className="flex items-center gap-sm">
            <BrandMark />
            <span className="text-label-lg font-semibold text-foreground">
              Aurora Salud
            </span>
          </Link>
          {paciente ? (
            <form action={salir}>
              <button
                type="submit"
                className="flex h-10 items-center gap-1.5 rounded-lg px-sm text-label-md text-fg-secondary transition-colors hover:bg-surface-subtle hover:text-foreground"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Salir
              </button>
            </form>
          ) : null}
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[52rem] flex-1 flex-col px-gutter-mobile py-lg md:px-gutter">
        {children}
      </main>
    </div>
  )
}

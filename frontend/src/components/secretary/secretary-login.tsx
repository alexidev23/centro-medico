"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff, KeyRound, Mail, ShieldPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fieldClassName =
  "h-12 w-full min-w-0 rounded-lg bg-surface-subtle pl-11 text-body-md text-foreground transition-colors outline-none placeholder:text-placeholder focus-visible:bg-card focus-visible:ring-[3px] focus-visible:ring-ring/15"

const labelClassName =
  "flex items-center justify-between gap-xs text-label-lg text-foreground"

function SecretaryLogin() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    router.push("/panel")
  }

  return (
    <div className="relative w-full max-w-[28.75rem]">
      <div
        className="pointer-events-none absolute -top-10 -left-10 hidden size-40 rounded-full bg-primary-subtle/40 blur-3xl sm:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 -bottom-10 hidden size-44 rounded-full bg-surface-subtle blur-3xl sm:block"
        aria-hidden="true"
      />

      <div className="relative flex w-full flex-col rounded-xl bg-card px-md py-lg shadow-card md:px-lg md:py-xl">
        <div className="mb-md flex items-center justify-between gap-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-subtle px-sm py-1 text-label-sm font-semibold text-primary">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            Modo demo
          </span>
        </div>

        <div className="mb-lg flex items-center gap-sm">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-card">
            <ShieldPlus className="size-6" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <span className="block truncate text-headline-sm font-bold tracking-tight text-foreground">
              Centro Médico Aurora
            </span>
            <span className="block text-label-md text-primary">
              Gestión &amp; Secretaría Médica
            </span>
          </div>
        </div>

        <div className="mb-md flex flex-col">
          <h1 className="text-headline-md font-bold tracking-tight text-foreground">
            Ingreso a secretaría
          </h1>
          <p className="mt-1 text-body-md leading-snug text-fg-secondary">
            Acceso exclusivo para el personal de recepción y administración clínica.
          </p>
        </div>

        <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className={labelClassName}>
              <span>Correo electrónico profesional</span>
              <span className="text-label-sm text-fg-secondary">Obligatorio</span>
            </label>
            <div className="relative flex items-center">
              <Mail
                className="pointer-events-none absolute left-3.5 size-5 text-fg-secondary"
                aria-hidden="true"
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                placeholder="recepcion@centromedicoaurora.com.ar"
                required
                className={cn(fieldClassName, "pr-4")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className={labelClassName}>
              <span>Contraseña</span>
              <span className="text-label-sm text-fg-secondary">Sensible</span>
            </label>
            <div className="relative flex items-center">
              <KeyRound
                className="pointer-events-none absolute left-3.5 size-5 text-fg-secondary"
                aria-hidden="true"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Ingresá tu clave de recepción"
                required
                className={cn(fieldClassName, "pr-12")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label="Mostrar u ocultar contraseña"
                aria-pressed={showPassword}
                className="absolute right-2.5 flex size-8 items-center justify-center rounded text-fg-secondary transition-colors hover:bg-surface-subtle hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-5" aria-hidden="true" />
                ) : (
                  <Eye className="size-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="mt-1 w-full gap-xs">
            Ingresar al sistema
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>

          <p className="text-body-sm text-fg-secondary">
            Sin backend todavía: este ingreso no autentica, solo abre el panel de
            demostración.
          </p>
        </form>
      </div>
    </div>
  )
}

export { SecretaryLogin }

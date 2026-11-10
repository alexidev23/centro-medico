import Link from "next/link"

function PanelTopbar() {
  return (
    <header className="flex items-center justify-between gap-sm border-b border-surface-subtle bg-card px-gutter-mobile py-sm md:px-gutter">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-subtle px-sm py-1 text-label-sm font-semibold text-primary">
        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
        Modo demo
      </span>
      <div className="flex min-w-0 items-center gap-sm">
        <span className="hidden truncate text-label-md text-fg-secondary sm:inline">
          Recepción &amp; Secretaría
        </span>
        <Link
          href="/ingreso"
          className="text-label-md text-primary underline-offset-4 hover:underline"
        >
          Volver al ingreso
        </Link>
      </div>
    </header>
  )
}

export { PanelTopbar }

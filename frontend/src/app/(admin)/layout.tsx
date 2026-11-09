import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-background px-gutter-mobile py-xl md:px-gutter">
      {children}
    </main>
  )
}

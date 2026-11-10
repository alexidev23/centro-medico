import type { ReactNode } from "react"
import { PanelSidebar } from "@/components/secretary/panel-sidebar"
import { PanelTopbar } from "@/components/secretary/panel-topbar"

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background lg:flex-row">
      <PanelSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <PanelTopbar />
        <main className="flex-1 px-gutter-mobile py-lg md:px-gutter">
          {children}
        </main>
      </div>
    </div>
  )
}

import type { ReactNode } from "react"
import { BookingHeader } from "@/components/booking/booking-header"

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <BookingHeader />
      <div className="flex-1 pt-16 md:pt-20">{children}</div>
    </div>
  )
}

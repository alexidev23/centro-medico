import { BookingSteps } from "@/components/landing/booking-steps"
import { Hero } from "@/components/landing/hero"
import { Specialties } from "@/components/landing/specialties"
import { StatsStrip } from "@/components/landing/stats-strip"

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <Specialties />
      <BookingSteps />
    </main>
  )
}

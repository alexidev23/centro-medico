import { BookingSteps } from "@/components/landing/booking-steps"
import { Contact } from "@/components/landing/contact"
import { Faq } from "@/components/landing/faq"
import { Hero } from "@/components/landing/hero"
import { Professionals } from "@/components/landing/professionals"
import { Specialties } from "@/components/landing/specialties"
import { StatsStrip } from "@/components/landing/stats-strip"

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <Specialties />
      <BookingSteps />
      <Professionals />
      <Faq />
      <Contact />
    </main>
  )
}

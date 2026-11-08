import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { cn } from "cn"
import { buttonVariants } from "@/components/ui/button"

function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-center px-gutter-mobile py-sm">
        <Link
          href="#reservar-turno"
          className={cn(
            buttonVariants({ variant: "primary" }),
            "w-full max-w-[28rem] shadow-raised"
          )}
        >
          <CalendarDays className="size-5" />
          Sacar turno
        </Link>
      </div>
    </div>
  )
}

export { MobileCtaBar }

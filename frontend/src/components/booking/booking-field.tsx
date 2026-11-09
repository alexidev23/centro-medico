"use client"

import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type BookingFieldProps = {
  id: string
  label: string
  required?: boolean
  hint?: string
  icon?: LucideIcon
  children: ReactNode
}

function BookingField({
  id,
  label,
  required = false,
  hint,
  icon: Icon,
  children,
}: BookingFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center justify-between gap-xs text-label-md font-semibold text-foreground"
      >
        <span>
          {label}
          {required ? <span className="text-primary"> *</span> : null}
        </span>
      </label>
      <div
        className={cn(
          "relative",
          Icon && "[&_input]:pr-11 [&_select]:pr-11 [&_textarea]:pr-11",
        )}
      >
        {children}
        {Icon ? (
          <Icon
            className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-fg-secondary"
            aria-hidden="true"
          />
        ) : null}
      </div>
      {hint ? (
        <span className="text-[12px] text-fg-secondary">{hint}</span>
      ) : null}
    </div>
  )
}

export { BookingField }

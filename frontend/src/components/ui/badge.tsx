import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-label-sm whitespace-nowrap",
  {
    variants: {
      variant: {
        confirmed:
          "bg-status-confirmed-bg text-status-confirmed-text [--badge-dot:var(--status-confirmed)]",
        pending:
          "bg-status-pending-bg text-status-pending-text [--badge-dot:var(--status-pending)]",
        cancelled:
          "bg-status-cancelled-bg text-status-cancelled-text [--badge-dot:var(--status-cancelled)]",
      },
    },
    defaultVariants: {
      variant: "confirmed",
    },
  }
)

function Badge({
  className,
  variant = "confirmed",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

function BadgeDot({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge-dot"
      className={cn("size-1.5 rounded-full bg-(--badge-dot)", className)}
      {...props}
    />
  )
}

export { Badge, BadgeDot, badgeVariants }

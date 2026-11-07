import { Clock, Headset, MapPin } from "lucide-react"

const blocks = [
  {
    icon: MapPin,
    title: "Centro Médico Aurora",
    lines: [
      "Av. Hipólito Yrigoyen 320, Nueva Córdoba, Córdoba, Argentina.",
    ],
  },
  {
    icon: Clock,
    title: "Horarios de atención",
    lines: ["Lunes a Viernes: 8:00 a 20:00 hs", "Sábados: 8:00 a 13:00 hs"],
  },
  {
    icon: Headset,
    title: "Central de turnos y urgencias leves",
    lines: ["Teléfono / WhatsApp: +54 351 555-0188"],
  },
]

function SiteFooter() {
  return (
    <footer className="mt-xl flex w-full flex-col gap-md bg-surface-subtle px-gutter-mobile pt-lg pb-28">
      {blocks.map((block) => (
        <div key={block.title} className="flex flex-col gap-xs">
          <div className="flex items-center gap-xs text-primary">
            <block.icon className="size-5" />
            <span className="text-label-md font-semibold text-foreground">
              {block.title}
            </span>
          </div>
          {block.lines.map((line) => (
            <p key={line} className="text-body-sm text-fg-secondary">
              {line}
            </p>
          ))}
        </div>
      ))}
      <p className="mt-xs pt-sm text-center text-label-sm italic text-muted-foreground">
        Proyecto demo. Datos ficticios.
      </p>
    </footer>
  )
}

export { SiteFooter }

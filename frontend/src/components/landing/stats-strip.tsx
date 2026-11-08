import { CreditCard, ShieldCheck } from "lucide-react"

const STATS = [
  {
    value: "12+",
    label: "Años de trayectoria",
    detail:
      "Atención continua y excelencia médica en el corazón de la ciudad universitaria y residencial.",
  },
  {
    value: "6",
    label: "Médicos y especialistas",
    detail:
      "Un equipo interdisciplinario coordinado para resolver tus consultas con cercanía y calidez.",
  },
  {
    value: "+45k",
    label: "Pacientes cuidados",
    detail:
      "Historias clínicas rigurosas, diagnósticos precisos y seguimiento personalizado.",
  },
]

const COVERAGES = ["OSDE", "Swiss Medical", "APROSS"]

function StatsStrip() {
  return (
    <>
      <section className="bg-surface-subtle py-md lg:hidden">
        <div className="mx-auto grid w-full max-w-page grid-cols-3 gap-xs px-gutter-mobile md:gap-md md:px-gutter">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-lg bg-card p-sm text-center shadow-card"
            >
              <span className="text-headline-sm font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-label-sm leading-tight text-fg-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-page px-gutter-mobile pt-lg pb-lg md:px-gutter lg:py-lg">
        <div className="hidden rounded-lg bg-card p-xl shadow-card lg:block">
          <div className="grid grid-cols-3 gap-lg">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-xs">
                <span className="text-display tracking-tight text-primary">
                  {stat.value}
                </span>
                <span className="text-title-md text-foreground">{stat.label}</span>
                <p className="text-body-sm text-fg-secondary">{stat.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-xl flex items-center justify-between gap-sm rounded-lg bg-surface-subtle p-md">
            <div className="flex items-center gap-sm text-foreground">
              <ShieldCheck className="size-6 shrink-0 text-primary" />
              <span className="text-label-lg">
                Atendemos OSDE, Swiss Medical, APROSS y consultas particulares
              </span>
            </div>
            <span className="text-body-sm text-fg-secondary">
              Facturación directa y reintegros sin trámites complejos
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-md lg:hidden">
          <div className="flex flex-col gap-xs">
            <span className="text-label-sm font-semibold tracking-wider text-primary uppercase">
              Coberturas médicas
            </span>
            <h2 className="text-title-md font-bold text-foreground">
              Atendemos obras sociales y prepagas
            </h2>
            <p className="text-body-sm text-fg-secondary">
              Trabajamos con convenios directos para agilizar tus consultas sin vueltas.
            </p>
          </div>
          <div className="flex flex-wrap gap-xs">
            {COVERAGES.map((coverage) => (
              <span
                key={coverage}
                className="flex items-center gap-1.5 rounded-lg bg-card px-md py-2.5 text-label-md text-foreground shadow-card"
              >
                <span className="size-2 rounded-full bg-primary" />
                {coverage}
              </span>
            ))}
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-subtle px-md py-2.5 text-label-md font-semibold text-primary">
              <CreditCard className="size-4" />
              Particular
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export { StatsStrip }

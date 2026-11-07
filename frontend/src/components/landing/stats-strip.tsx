const stats = [
  { value: "12+", label: "Años de trayectoria" },
  { value: "28", label: "Médicos especialistas" },
  { value: "+45k", label: "Pacientes cuidados" },
]

function StatsStrip() {
  return (
    <section className="bg-surface-subtle px-gutter-mobile py-md">
      <div className="grid grid-cols-3 gap-xs">
        {stats.map((stat) => (
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
  )
}

export { StatsStrip }

import { Badge, BadgeDot } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-xl px-gutter-mobile py-margin">
      <header className="flex flex-col gap-sm">
        <p className="text-label-md text-primary">
          Centro Médico Aurora · sistema de diseño
        </p>
        <h1 className="text-headline-lg-mobile text-foreground md:text-headline-lg">
          Componentes base
        </h1>
      </header>

      <section className="flex flex-col gap-md">
        <h2 className="text-headline-sm text-foreground">Botones</h2>
        <div className="flex flex-wrap items-center gap-md">
          <Button>Sacar turno</Button>
          <Button variant="secondary">Ver especialidades</Button>
          <Button variant="ghost">Cancelar</Button>
        </div>
      </section>

      <section className="flex flex-col gap-md">
        <h2 className="text-headline-sm text-foreground">Estados de turno</h2>
        <div className="flex flex-wrap items-center gap-md">
          <Badge variant="confirmed">
            <BadgeDot />
            Confirmado
          </Badge>
          <Badge variant="pending">
            <BadgeDot />
            Pendiente
          </Badge>
          <Badge variant="cancelled">
            <BadgeDot />
            Cancelado
          </Badge>
        </div>
      </section>

      <section className="flex flex-col gap-md">
        <h2 className="text-headline-sm text-foreground">Campos</h2>
        <div className="flex flex-col gap-xs">
          <label htmlFor="full-name" className="text-label-md text-foreground">
            Nombre y apellido
          </label>
          <Input id="full-name" placeholder="Ej. Ana Gómez" />
        </div>
      </section>

      <section className="flex flex-col gap-md">
        <h2 className="text-headline-sm text-foreground">Tarjeta</h2>
        <Card>
          <CardHeader>
            <CardTitle>Dra. Lucía Fernández</CardTitle>
            <CardDescription>Clínica médica · Nueva Córdoba</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-md text-foreground">
              Atención de lunes a viernes, turnos cada 30 minutos.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

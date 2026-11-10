export type TurnoEstado =
  | "pendiente"
  | "confirmado"
  | "en-sala"
  | "atendido"
  | "cancelado"

export type Profesional = {
  id: string
  nombre: string
  especialidad: string
  consultorio: string
}

export type Paciente = {
  id: string
  nombre: string
  documento: string
  proveedor: string
  plan: string | null
  telefono: string
}

export type DiaSemana = "lun" | "mar" | "mie" | "jue" | "vie" | "sab"

export type Turno = {
  id: string
  hora: string
  dia: DiaSemana
  motivo: string
  pacienteId: string
  profesionalId: string
  estado: TurnoEstado
}

export const profesionales: Profesional[] = [
  { id: "pr-1", nombre: "Dra. Lucía Ferrero", especialidad: "Clínica médica", consultorio: "Consultorio 2" },
  { id: "pr-2", nombre: "Dr. Martín Salguero", especialidad: "Cardiología", consultorio: "Consultorio 4" },
  { id: "pr-3", nombre: "Dra. Paula Iturbe", especialidad: "Pediatría", consultorio: "Consultorio 1" },
  { id: "pr-4", nombre: "Dr. Ignacio Paz", especialidad: "Dermatología", consultorio: "Consultorio 3" },
  { id: "pr-5", nombre: "Dra. Sofía Ledesma", especialidad: "Ginecología", consultorio: "Consultorio 5" },
  { id: "pr-6", nombre: "Dr. Emilio Quiroga", especialidad: "Traumatología", consultorio: "Consultorio 6" },
]

export const pacientes: Paciente[] = [
  { id: "pa-1", nombre: "Ana Lucero", documento: "28.442.119", proveedor: "OSDE", plan: "210", telefono: "351 482-9912" },
  { id: "pa-2", nombre: "Bruno Cáceres", documento: "31.208.774", proveedor: "Swiss Medical", plan: "SMG20", telefono: "351 611-3094" },
  { id: "pa-3", nombre: "Carla Domínguez", documento: "26.905.331", proveedor: "Particular", plan: null, telefono: "351 455-7720" },
  { id: "pa-4", nombre: "Diego Ferreyra", documento: "35.771.402", proveedor: "Apross", plan: null, telefono: "351 470-2286" },
  { id: "pa-5", nombre: "Elena Bustos", documento: "22.310.587", proveedor: "PAMI", plan: null, telefono: "351 463-1187" },
  { id: "pa-6", nombre: "Facundo Molina", documento: "40.118.226", proveedor: "Particular", plan: null, telefono: "351 598-4402" },
  { id: "pa-7", nombre: "Gabriela Ponce", documento: "29.564.903", proveedor: "OSDE", plan: "310", telefono: "351 505-6631" },
  { id: "pa-8", nombre: "Hernán Vega", documento: "33.902.448", proveedor: "Apross", plan: null, telefono: "351 447-9058" },
  { id: "pa-9", nombre: "Irene Salas", documento: "41.772.305", proveedor: "Particular", plan: null, telefono: "351 533-8814" },
]

/** A coverage as the secretaría reads it: the provider, and its plan when it has one. */
export function coberturaDe({ proveedor, plan }: Paciente) {
  return plan ? `${proveedor} ${plan}` : proveedor
}

export const turnos: Turno[] = [
  { id: "tu-1", hora: "08:00", dia: "lun", motivo: "Control anual", pacienteId: "pa-1", profesionalId: "pr-1", estado: "atendido" },
  { id: "tu-2", hora: "08:30", dia: "lun", motivo: "Primera consulta", pacienteId: "pa-2", profesionalId: "pr-2", estado: "atendido" },
  { id: "tu-3", hora: "09:00", dia: "lun", motivo: "Control anual", pacienteId: "pa-3", profesionalId: "pr-3", estado: "atendido" },
  { id: "tu-4", hora: "09:30", dia: "lun", motivo: "Primera consulta", pacienteId: "pa-4", profesionalId: "pr-4", estado: "cancelado" },
  { id: "tu-5", hora: "10:00", dia: "lun", motivo: "Control anual", pacienteId: "pa-5", profesionalId: "pr-1", estado: "atendido" },
  { id: "tu-6", hora: "10:30", dia: "lun", motivo: "Control anual", pacienteId: "pa-6", profesionalId: "pr-5", estado: "en-sala" },
  { id: "tu-7", hora: "11:00", dia: "lun", motivo: "Primera consulta", pacienteId: "pa-7", profesionalId: "pr-6", estado: "confirmado" },
  { id: "tu-8", hora: "11:30", dia: "lun", motivo: "Control anual", pacienteId: "pa-8", profesionalId: "pr-2", estado: "confirmado" },
  { id: "tu-9", hora: "12:00", dia: "lun", motivo: "Primera consulta", pacienteId: "pa-1", profesionalId: "pr-3", estado: "pendiente" },
  { id: "tu-10", hora: "15:00", dia: "lun", motivo: "Control anual", pacienteId: "pa-2", profesionalId: "pr-4", estado: "pendiente" },
  { id: "tu-11", hora: "16:00", dia: "lun", motivo: "Control anual", pacienteId: "pa-3", profesionalId: "pr-5", estado: "pendiente" },
  { id: "tu-12", hora: "17:30", dia: "lun", motivo: "Primera consulta", pacienteId: "pa-4", profesionalId: "pr-6", estado: "cancelado" },
  { id: "tu-13", hora: "08:00", dia: "mar", motivo: "Control anual", pacienteId: "pa-5", profesionalId: "pr-3", estado: "atendido" },
  { id: "tu-14", hora: "09:00", dia: "mar", motivo: "Control anual", pacienteId: "pa-6", profesionalId: "pr-2", estado: "atendido" },
  { id: "tu-15", hora: "10:00", dia: "mar", motivo: "Primera consulta", pacienteId: "pa-7", profesionalId: "pr-1", estado: "en-sala" },
  { id: "tu-16", hora: "11:00", dia: "mar", motivo: "Control anual", pacienteId: "pa-8", profesionalId: "pr-4", estado: "confirmado" },
  { id: "tu-17", hora: "12:00", dia: "mar", motivo: "Primera consulta", pacienteId: "pa-1", profesionalId: "pr-5", estado: "pendiente" },
  { id: "tu-18", hora: "08:30", dia: "mie", motivo: "Control anual", pacienteId: "pa-2", profesionalId: "pr-6", estado: "atendido" },
  { id: "tu-19", hora: "09:30", dia: "mie", motivo: "Primera consulta", pacienteId: "pa-3", profesionalId: "pr-4", estado: "cancelado" },
  { id: "tu-20", hora: "11:00", dia: "mie", motivo: "Control anual", pacienteId: "pa-4", profesionalId: "pr-2", estado: "confirmado" },
  { id: "tu-21", hora: "12:30", dia: "mie", motivo: "Primera consulta", pacienteId: "pa-5", profesionalId: "pr-6", estado: "pendiente" },
  { id: "tu-22", hora: "08:00", dia: "jue", motivo: "Control anual", pacienteId: "pa-6", profesionalId: "pr-3", estado: "atendido" },
  { id: "tu-23", hora: "09:00", dia: "jue", motivo: "Primera consulta", pacienteId: "pa-7", profesionalId: "pr-5", estado: "confirmado" },
  { id: "tu-24", hora: "10:30", dia: "jue", motivo: "Control anual", pacienteId: "pa-8", profesionalId: "pr-1", estado: "en-sala" },
  { id: "tu-25", hora: "12:30", dia: "jue", motivo: "Primera consulta", pacienteId: "pa-1", profesionalId: "pr-4", estado: "pendiente" },
  { id: "tu-26", hora: "15:00", dia: "jue", motivo: "Control anual", pacienteId: "pa-2", profesionalId: "pr-2", estado: "pendiente" },
  { id: "tu-27", hora: "09:00", dia: "vie", motivo: "Control anual", pacienteId: "pa-3", profesionalId: "pr-1", estado: "atendido" },
  { id: "tu-28", hora: "10:00", dia: "vie", motivo: "Control anual", pacienteId: "pa-4", profesionalId: "pr-6", estado: "atendido" },
  { id: "tu-29", hora: "11:30", dia: "vie", motivo: "Primera consulta", pacienteId: "pa-5", profesionalId: "pr-2", estado: "confirmado" },
  { id: "tu-30", hora: "12:00", dia: "vie", motivo: "Primera consulta", pacienteId: "pa-6", profesionalId: "pr-5", estado: "cancelado" },
  { id: "tu-31", hora: "09:00", dia: "sab", motivo: "Control anual", pacienteId: "pa-7", profesionalId: "pr-6", estado: "confirmado" },
  { id: "tu-32", hora: "10:00", dia: "sab", motivo: "Primera consulta", pacienteId: "pa-8", profesionalId: "pr-3", estado: "pendiente" },
  { id: "tu-33", hora: "11:00", dia: "sab", motivo: "Control anual", pacienteId: "pa-1", profesionalId: "pr-1", estado: "atendido" },
  { id: "tu-34", hora: "12:00", dia: "sab", motivo: "Primera consulta", pacienteId: "pa-2", profesionalId: "pr-4", estado: "pendiente" },
]

const diasPorIndice: (DiaSemana | null)[] = [
  null,
  "lun",
  "mar",
  "mie",
  "jue",
  "vie",
  "sab",
]

/** Fixture key for a date; `null` on Sunday, when the sede is closed. */
export function diaDeLaSemana(fecha: Date): DiaSemana | null {
  return diasPorIndice[fecha.getDay()]
}

export const diasDeLaSemana: DiaSemana[] = [
  "lun",
  "mar",
  "mie",
  "jue",
  "vie",
  "sab",
]

export const etiquetasDia: Record<DiaSemana, string> = {
  lun: "Lun",
  mar: "Mar",
  mie: "Mié",
  jue: "Jue",
  vie: "Vie",
  sab: "Sáb",
}

export type FechaDeLaSemana = {
  dia: DiaSemana
  fecha: Date
}

/** Monday to Saturday of the week that contains `fecha`. */
export function fechasDeLaSemana(fecha: Date): FechaDeLaSemana[] {
  const lunes = new Date(fecha)
  const indice = fecha.getDay()
  lunes.setDate(fecha.getDate() - (indice === 0 ? 6 : indice - 1))
  lunes.setHours(0, 0, 0, 0)

  return diasDeLaSemana.map((dia, offset) => {
    const delDia = new Date(lunes)
    delDia.setDate(lunes.getDate() + offset)

    return { dia, fecha: delDia }
  })
}

const mesFormatter = new Intl.DateTimeFormat("es-AR", { month: "long" })

const capitalizar = (texto: string) =>
  texto.charAt(0).toUpperCase() + texto.slice(1)

/**
 * Week label for the grid. It stays on the server so the dates are never
 * formatted twice in two timezones.
 */
export function etiquetaDeSemana(fechas: FechaDeLaSemana[]) {
  const primero = fechas[0].fecha
  const ultimo = fechas[fechas.length - 1].fecha
  const mesPrimero = capitalizar(mesFormatter.format(primero))
  const mesUltimo = capitalizar(mesFormatter.format(ultimo))
  const anio = ultimo.getFullYear()

  if (primero.getMonth() === ultimo.getMonth()) {
    return `${primero.getDate()} al ${ultimo.getDate()} de ${mesPrimero}, ${anio}`
  }

  return `${primero.getDate()} de ${mesPrimero} al ${ultimo.getDate()} de ${mesUltimo}, ${anio}`
}

export type ResumenDelDia = {
  total: number
  pendientes: number
  cancelados: number
  atendidos: number
  primeraHora: string
  ultimaHora: string
}

export function resumenDelDia(dia: DiaSemana): ResumenDelDia {
  const delDia = turnosDelDia(dia)
  const contar = (estado: TurnoEstado) =>
    delDia.filter((turno) => turno.estado === estado).length

  return {
    total: delDia.length,
    pendientes: contar("pendiente"),
    cancelados: contar("cancelado"),
    atendidos: contar("atendido"),
    primeraHora: delDia[0]?.hora ?? "—",
    ultimaHora: delDia[delDia.length - 1]?.hora ?? "—",
  }
}

export type TurnoDelDia = Turno & {
  paciente: Paciente
  profesional: Profesional
}

export function consultorioCorto(consultorio: string) {
  return consultorio.replace("Consultorio ", "Cons. ")
}

const pacientePorId = new Map(
  pacientes.map((paciente) => [paciente.id, paciente] as const),
)
const profesionalPorId = new Map(
  profesionales.map((profesional) => [profesional.id, profesional] as const),
)

export function turnosDelDia(dia: DiaSemana): TurnoDelDia[] {
  return turnos
    .filter((turno) => turno.dia === dia)
    .sort((a, b) => a.hora.localeCompare(b.hora))
    .map(conPacienteYProfesional)
}

/** Every turno of the week, in day and hour order. */
export function turnosDeLaSemana(): TurnoDelDia[] {
  return diasDeLaSemana.flatMap(turnosDelDia)
}

function conPacienteYProfesional(turno: Turno): TurnoDelDia {
  const paciente = pacientePorId.get(turno.pacienteId)
  const profesional = profesionalPorId.get(turno.profesionalId)

  if (!paciente || !profesional) {
    throw new Error(`Turno ${turno.id} points to a missing id`)
  }

  return { ...turno, paciente, profesional }
}

export type PacienteDelPadron = Paciente & {
  proximo: { cuando: string; profesional: string } | null
}

const diaYMesFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
})

/**
 * "Lun 16 nov, 16:00 hs". Dates are formatted here, on the server, for the same
 * reason the agenda label is: the browser's timezone must not move a day.
 */
function etiquetaDeTurno(fecha: Date, turno: TurnoDelDia, enDias: number) {
  const delDia = new Date(fecha)
  delDia.setDate(fecha.getDate() + enDias)
  const diaYMes = diaYMesFormatter.format(delDia).replace(".", "")

  return `${etiquetasDia[turno.dia]} ${diaYMes}, ${turno.hora} hs`
}

/**
 * The directory: every patient with the turno they have next. The fixtures are
 * one repeating week, so a patient with nothing left this week shows the same
 * weekday of the next one instead of a blank cell.
 */
export function pacientesDelPadron(fecha: Date): PacienteDelPadron[] {
  // The fixtures skip Sunday, so a weekday is 1..6 and the calendar is 0..6:
  // that mismatch is why the distance below is counted on the calendar, not on
  // the list. Sunday has nothing to show, so the week starts tomorrow.
  const diaDeHoy = fecha.getDay()
  const desde = diaDeHoy === 0 ? 0 : diaDeHoy - 1

  const yaPaso = (turno: TurnoDelDia) =>
    turno.estado === "cancelado" || turno.estado === "atendido"

  return pacientes.map((paciente) => {
    for (let paso = 0; paso < diasDeLaSemana.length; paso += 1) {
      const indice = (desde + paso) % diasDeLaSemana.length
      const turno = turnosDelDia(diasDeLaSemana[indice]).find(
        (candidato) =>
          candidato.pacienteId === paciente.id && !yaPaso(candidato),
      )

      if (turno) {
        const enDias = (indice + 1 - diaDeHoy + 7) % 7

        return {
          ...paciente,
          proximo: {
            cuando: etiquetaDeTurno(fecha, turno, enDias),
            profesional: turno.profesional.nombre,
          },
        }
      }
    }

    return { ...paciente, proximo: null }
  })
}

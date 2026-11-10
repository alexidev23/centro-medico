export type TurnoEstado =
  | "pendiente"
  | "confirmado"
  | "en-sala"
  | "atendido"
  | "cancelado"

export type Planta = "Baja" | "Alta"

export type Consultorio = {
  nombre: string
  planta: Planta
}

export type Profesional = {
  id: string
  nombre: string
  especialidad: string
  consultorio: string
  /** Provincial licence number, without the "M.P." prefix. */
  matricula: string
  /** Standard appointment length, in minutes. */
  duracion: number
}

export type Paciente = {
  id: string
  nombre: string
  documento: string
  proveedor: string
  plan: string | null
  telefono: string
  nacimiento: string
  domicilio: string
  email: string
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

/** The sede's rooms. The planta belongs to the room, not to the professional. */
export const consultorios: Consultorio[] = [
  { nombre: "Consultorio 1", planta: "Baja" },
  { nombre: "Consultorio 2", planta: "Baja" },
  { nombre: "Consultorio 3", planta: "Alta" },
  { nombre: "Consultorio 4", planta: "Alta" },
  { nombre: "Consultorio 5", planta: "Baja" },
  { nombre: "Consultorio 6", planta: "Alta" },
]

export const profesionales: Profesional[] = [
  { id: "pr-1", nombre: "Dra. Lucía Ferrero", especialidad: "Clínica médica", consultorio: "Consultorio 2", matricula: "34.892", duracion: 30 },
  { id: "pr-2", nombre: "Dr. Martín Salguero", especialidad: "Cardiología", consultorio: "Consultorio 4", matricula: "28.140", duracion: 30 },
  { id: "pr-3", nombre: "Dra. Paula Iturbe", especialidad: "Pediatría", consultorio: "Consultorio 1", matricula: "41.502", duracion: 20 },
  { id: "pr-4", nombre: "Dr. Ignacio Paz", especialidad: "Dermatología", consultorio: "Consultorio 3", matricula: "19.831", duracion: 30 },
  { id: "pr-5", nombre: "Dra. Sofía Ledesma", especialidad: "Ginecología", consultorio: "Consultorio 5", matricula: "36.904", duracion: 30 },
  { id: "pr-6", nombre: "Dr. Emilio Quiroga", especialidad: "Traumatología", consultorio: "Consultorio 6", matricula: "22.415", duracion: 45 },
]

export const pacientes: Paciente[] = [
  { id: "pa-1", nombre: "Ana Lucero", documento: "28.442.119", proveedor: "OSDE", plan: "210", telefono: "351 482-9912", nacimiento: "1988-07-14", domicilio: "Av. Hipólito Yrigoyen 320, 4° B", email: "ana.lucero@example.com" },
  { id: "pa-2", nombre: "Bruno Cáceres", documento: "31.208.774", proveedor: "Swiss Medical", plan: "SMG20", telefono: "351 611-3094", nacimiento: "1990-02-03", domicilio: "Bv. San Juan 740, 6° B", email: "bruno.caceres@example.com" },
  { id: "pa-3", nombre: "Carla Domínguez", documento: "26.905.331", proveedor: "Particular", plan: null, telefono: "351 455-7720", nacimiento: "1995-11-27", domicilio: "Av. Poeta Lugones 210, 2° A", email: "carla.dominguez@example.com" },
  { id: "pa-4", nombre: "Diego Ferreyra", documento: "35.771.402", proveedor: "Apross", plan: null, telefono: "351 470-2286", nacimiento: "1984-09-08", domicilio: "Av. Vélez Sarsfield 1050, 3° C", email: "diego.ferreyra@example.com" },
  { id: "pa-5", nombre: "Elena Bustos", documento: "22.310.587", proveedor: "PAMI", plan: null, telefono: "351 463-1187", nacimiento: "1952-05-19", domicilio: "Av. Olmos 455, 1° D", email: "elena.bustos@example.com" },
  { id: "pa-6", nombre: "Facundo Molina", documento: "40.118.226", proveedor: "Particular", plan: null, telefono: "351 598-4402", nacimiento: "1992-03-18", domicilio: "Av. Estrada 88, 5° A", email: "facundo.molina@example.com" },
  { id: "pa-7", nombre: "Gabriela Ponce", documento: "29.564.903", proveedor: "OSDE", plan: "310", telefono: "351 505-6631", nacimiento: "1979-12-01", domicilio: "Av. Rafael Núñez 4200, casa 7", email: "gabriela.ponce@example.com" },
  { id: "pa-8", nombre: "Hernán Vega", documento: "33.902.448", proveedor: "Apross", plan: null, telefono: "351 447-9058", nacimiento: "1975-06-23", domicilio: "Av. Colón 1200, 9° B", email: "hernan.vega@example.com" },
  { id: "pa-9", nombre: "Irene Salas", documento: "41.772.305", proveedor: "Particular", plan: null, telefono: "351 533-8814", nacimiento: "1998-04-06", domicilio: "Bv. Illia 145, 2° C", email: "irene.salas@example.com" },
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

/** Full names, for prose: the card writes "Lunes, Miércoles y Jueves". */
export const nombresDia: Record<DiaSemana, string> = {
  lun: "Lunes",
  mar: "Martes",
  mie: "Miércoles",
  jue: "Jueves",
  vie: "Viernes",
  sab: "Sábado",
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

export type ResumenDelCuerpo = {
  profesionales: number
  especialidades: number
  consultorios: number
  turnosDeHoy: number
  atendidosHoy: number
  enEsperaHoy: number
  pendientesHoy: number
}

/**
 * The headline numbers of the staff screen, counted from the same fixtures the
 * agenda and the directory read, so the summary cannot disagree with them.
 */
export function resumenDelCuerpoProfesional(fecha: Date): ResumenDelCuerpo {
  const dia = diaDeLaSemana(fecha)
  const deHoy = dia === null ? [] : turnosDelDia(dia)
  const contar = (...estados: TurnoEstado[]) =>
    deHoy.filter((turno) => estados.includes(turno.estado)).length

  return {
    profesionales: profesionales.length,
    especialidades: new Set(profesionales.map((uno) => uno.especialidad)).size,
    consultorios: new Set(profesionales.map((uno) => uno.consultorio)).size,
    turnosDeHoy: deHoy.length,
    atendidosHoy: contar("atendido"),
    enEsperaHoy: contar("confirmado", "en-sala"),
    pendientesHoy: contar("pendiente"),
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

export type ProximoTurno = {
  id: string
  /** `YYYY-MM-DD`: the fixture repeats every week, so the id alone is not a date. */
  fecha: string
  /** "Jue 12 nov, 16:00 hs" — what the directory table prints. */
  cuando: string
  profesional: string
  /** "Jueves 12 de noviembre" — the headline of the record card. */
  dia: string
  hora: string
  especialidad: string
  consultorio: string
  motivo: string
  estado: TurnoEstado
}

/** One turno the patient has in the current week, outside the record's card. */
export type TurnoDeLaSemana = {
  id: string
  /** `YYYY-MM-DD`, so two occurrences of a repeated turno never look alike. */
  fecha: string
  /** "Mar 10 nov, 12:00 hs" */
  cuando: string
  profesional: string
  especialidad: string
  motivo: string
  estado: TurnoEstado
}

export type PacienteDelPadron = Paciente & {
  proximo: ProximoTurno | null
  semana: TurnoDeLaSemana[]
  edad: number
  nacimientoTexto: string
}

const nacimientoFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

/** Age and long birth date, both from the `YYYY-MM-DD` the fixture stores. */
function datosDeNacimiento(nacimiento: string, hoy: Date) {
  const [anio, mes, dia] = nacimiento.split("-").map(Number)
  const cumple = new Date(anio, mes - 1, dia)
  const todaviaNoCumplio =
    hoy.getMonth() < cumple.getMonth() ||
    (hoy.getMonth() === cumple.getMonth() && hoy.getDate() < cumple.getDate())

  return {
    edad: hoy.getFullYear() - anio - (todaviaNoCumplio ? 1 : 0),
    texto: nacimientoFormatter.format(cumple),
  }
}

const diaYMesFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
})

const fechaLargaFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
})

/** The calendar day a turno of this week falls on. */
function fechaDelTurno(fecha: Date, enDias: number) {
  const delDia = new Date(fecha)
  delDia.setDate(fecha.getDate() + enDias)

  return delDia
}

/**
 * "Lun 16 nov, 16:00 hs". Dates are formatted here, on the server, for the same
 * reason the agenda label is: the browser's timezone must not move a day.
 */
function etiquetaDeTurno(delDia: Date, turno: TurnoDelDia) {
  const diaYMes = diaYMesFormatter.format(delDia).replace(".", "")

  return `${etiquetasDia[turno.dia]} ${diaYMes}, ${turno.hora} hs`
}

/** "Jueves 12 de noviembre": the long form the record card shows. */
function fechaLarga(delDia: Date) {
  const texto = fechaLargaFormatter.format(delDia)

  return `${texto[0].toUpperCase()}${texto.slice(1).replace(",", "")}`
}

/** `YYYY-MM-DD`: the key that separates two occurrences of the same turno. */
function fechaIso(delDia: Date) {
  const mes = String(delDia.getMonth() + 1).padStart(2, "0")
  const dia = String(delDia.getDate()).padStart(2, "0")

  return `${delDia.getFullYear()}-${mes}-${dia}`
}

/**
 * Every turno the patient has in the current week, in day and hour order. The
 * dates come from the real calendar, so a row can never disagree with the
 * agenda about what day a turno falls on.
 */
function semanaDelPaciente(pacienteId: string, fecha: Date): TurnoDeLaSemana[] {
  return fechasDeLaSemana(fecha).flatMap(({ dia, fecha: delDia }) =>
    turnosDelDia(dia)
      .filter((turno) => turno.pacienteId === pacienteId)
      .map((turno) => ({
        id: turno.id,
        fecha: fechaIso(delDia),
        cuando: etiquetaDeTurno(delDia, turno),
        profesional: turno.profesional.nombre,
        especialidad: turno.profesional.especialidad,
        motivo: turno.motivo,
        estado: turno.estado,
      })),
  )
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
    const { edad, texto: nacimientoTexto } = datosDeNacimiento(
      paciente.nacimiento,
      fecha,
    )
    const semana = semanaDelPaciente(paciente.id, fecha)

    for (let paso = 0; paso < diasDeLaSemana.length; paso += 1) {
      const indice = (desde + paso) % diasDeLaSemana.length
      const turno = turnosDelDia(diasDeLaSemana[indice]).find(
        (candidato) =>
          candidato.pacienteId === paciente.id && !yaPaso(candidato),
      )

      if (turno) {
        const enDias = (indice + 1 - diaDeHoy + 7) % 7
        const delDia = fechaDelTurno(fecha, enDias)

        return {
          ...paciente,
          edad,
          nacimientoTexto,
          semana,
          proximo: {
            id: turno.id,
            fecha: fechaIso(delDia),
            cuando: etiquetaDeTurno(delDia, turno),
            profesional: turno.profesional.nombre,
            dia: fechaLarga(delDia),
            hora: `${turno.hora} hs`,
            especialidad: turno.profesional.especialidad,
            consultorio: turno.profesional.consultorio,
            motivo: turno.motivo,
            estado: turno.estado,
          },
        }
      }
    }

    return { ...paciente, edad, nacimientoTexto, semana, proximo: null }
  })
}

export type EstadoDelProfesional = "en-sala" | "con-turnos" | "sin-turnos"

export type ProfesionalDelCuerpo = Profesional & {
  /** `null` when the room is not in the sede's list; never a guessed floor. */
  planta: Planta | null
  estado: EstadoDelProfesional
  /** "Lunes, Martes y Jueves" — only the days they actually attend. */
  dias: string
  /** "08:00 a 11:00 hs • 6 turnos"; never a range the agenda contradicts. */
  franja: string
}

const plantaPorConsultorio = new Map(
  consultorios.map(({ nombre, planta }) => [nombre, planta] as const),
)

function unirDias(dias: DiaSemana[]) {
  const nombres = dias.map((dia) => nombresDia[dia])
  if (nombres.length < 2) return nombres.join("")

  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`
}

/**
 * The staff grid: every professional with the floor of their room, the state of
 * today's agenda and the week they actually work. All of it comes from the same
 * fixtures the agenda already reads, so a card cannot promise a day, an hour or
 * a turno the grid below it contradicts.
 */
export function cuerpoProfesional(fecha: Date): ProfesionalDelCuerpo[] {
  const dia = diaDeLaSemana(fecha)
  const deHoy = dia === null ? [] : turnosDelDia(dia)
  const deLaSemana = turnosDeLaSemana()

  return profesionales.map((profesional) => {
    // A cancelled turno is not time they attend, so it counts for neither the
    // days, the franja, nor the count.
    const propios = deLaSemana.filter(
      (turno) =>
        turno.profesionalId === profesional.id && turno.estado !== "cancelado",
    )
    const hoy = deHoy.filter((turno) => turno.profesionalId === profesional.id)
    const dias = diasDeLaSemana.filter((candidato) =>
      propios.some((turno) => turno.dia === candidato),
    )

    // Sorted, because the fixture order is the order turnos were written, not
    // the order they happen: without this, a card read "11:00 a 09:00 hs".
    const horas = propios.map((turno) => turno.hora).sort()
    const desde = horas[0]
    const hasta = horas[horas.length - 1]
    const cantidad = `${propios.length} ${propios.length === 1 ? "turno" : "turnos"}`

    const estado: EstadoDelProfesional = hoy.some(
      (turno) => turno.estado === "en-sala",
    )
      ? "en-sala"
      : hoy.length > 0
        ? "con-turnos"
        : "sin-turnos"

    return {
      ...profesional,
      planta: plantaPorConsultorio.get(profesional.consultorio) ?? null,
      estado,
      dias: unirDias(dias),
      franja:
        desde === undefined
          ? "Sin turnos esta semana"
          : desde === hasta
            ? `${desde} hs • ${cantidad}`
            : `${desde} a ${hasta} hs • ${cantidad}`,
    }
  })
}

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
  cobertura: string
}

export type Turno = {
  id: string
  hora: string
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
  { id: "pa-1", nombre: "Ana Lucero", documento: "28.442.119", cobertura: "OSDE 210" },
  { id: "pa-2", nombre: "Bruno Cáceres", documento: "31.208.774", cobertura: "Swiss Medical" },
  { id: "pa-3", nombre: "Carla Domínguez", documento: "26.905.331", cobertura: "Particular" },
  { id: "pa-4", nombre: "Diego Ferreyra", documento: "35.771.402", cobertura: "Apross" },
  { id: "pa-5", nombre: "Elena Bustos", documento: "22.310.587", cobertura: "PAMI" },
  { id: "pa-6", nombre: "Facundo Molina", documento: "40.118.226", cobertura: "Particular" },
  { id: "pa-7", nombre: "Gabriela Ponce", documento: "29.564.903", cobertura: "OSDE 310" },
  { id: "pa-8", nombre: "Hernán Vega", documento: "33.902.448", cobertura: "Apross" },
]

export const turnos: Turno[] = [
  { id: "tu-1", hora: "08:00", pacienteId: "pa-1", profesionalId: "pr-1", estado: "atendido" },
  { id: "tu-2", hora: "08:30", pacienteId: "pa-2", profesionalId: "pr-2", estado: "atendido" },
  { id: "tu-3", hora: "09:00", pacienteId: "pa-3", profesionalId: "pr-3", estado: "atendido" },
  { id: "tu-4", hora: "09:30", pacienteId: "pa-4", profesionalId: "pr-4", estado: "cancelado" },
  { id: "tu-5", hora: "10:00", pacienteId: "pa-5", profesionalId: "pr-1", estado: "atendido" },
  { id: "tu-6", hora: "10:30", pacienteId: "pa-6", profesionalId: "pr-5", estado: "en-sala" },
  { id: "tu-7", hora: "11:00", pacienteId: "pa-7", profesionalId: "pr-6", estado: "confirmado" },
  { id: "tu-8", hora: "11:30", pacienteId: "pa-8", profesionalId: "pr-2", estado: "confirmado" },
  { id: "tu-9", hora: "12:00", pacienteId: "pa-1", profesionalId: "pr-3", estado: "pendiente" },
  { id: "tu-10", hora: "15:00", pacienteId: "pa-2", profesionalId: "pr-4", estado: "pendiente" },
  { id: "tu-11", hora: "16:00", pacienteId: "pa-3", profesionalId: "pr-5", estado: "pendiente" },
  { id: "tu-12", hora: "17:30", pacienteId: "pa-4", profesionalId: "pr-6", estado: "cancelado" },
]

export type ResumenDelDia = {
  total: number
  pendientes: number
  cancelados: number
  atendidos: number
  primeraHora: string
  ultimaHora: string
}

export function resumenDelDia(): ResumenDelDia {
  const contar = (estado: TurnoEstado) =>
    turnos.filter((turno) => turno.estado === estado).length

  return {
    total: turnos.length,
    pendientes: contar("pendiente"),
    cancelados: contar("cancelado"),
    atendidos: contar("atendido"),
    primeraHora: turnos[0]?.hora ?? "—",
    ultimaHora: turnos[turnos.length - 1]?.hora ?? "—",
  }
}

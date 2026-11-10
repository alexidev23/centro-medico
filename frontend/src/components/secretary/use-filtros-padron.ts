"use client"

import { useState } from "react"
import type { PacienteDelPadron } from "@/lib/secretary/demo-data"

export type FiltrosPadron = {
  consulta: string
  cobertura: string
  soloConTurno: boolean
}

const filtrosVacios: FiltrosPadron = {
  consulta: "",
  cobertura: "todas",
  soloConTurno: false,
}

const normalizar = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()

const soloDigitos = (texto: string) => texto.replace(/\D/g, "")

const coincide = (paciente: PacienteDelPadron, consulta: string) => {
  if (consulta === "") return true

  const texto = normalizar(consulta)
  const digitos = soloDigitos(consulta)

  return (
    normalizar(paciente.nombre).includes(texto) ||
    (digitos !== "" &&
      (soloDigitos(paciente.documento).includes(digitos) ||
        soloDigitos(paciente.telefono).includes(digitos)))
  )
}

/**
 * Filter state of the padrón plus the rows it leaves. It lives outside the
 * table because the record beside it has to follow the rows on screen.
 */
export function useFiltrosPadron(pacientes: PacienteDelPadron[]) {
  const [filtros, setFiltros] = useState<FiltrosPadron>(filtrosVacios)

  const visibles = pacientes.filter(
    (paciente) =>
      (filtros.cobertura === "todas" ||
        paciente.proveedor === filtros.cobertura) &&
      (!filtros.soloConTurno || paciente.proximo !== null) &&
      coincide(paciente, filtros.consulta),
  )

  return { filtros, setFiltros, visibles }
}

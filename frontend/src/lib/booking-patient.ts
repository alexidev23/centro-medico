type PatientDraft = {
  name: string
  dni: string
  phone: string
  email: string
  insurance: string
  affiliate: string
  reason: string
  accepted: boolean
}

const INSURANCES = ["OSDE", "Swiss Medical", "APROSS", "Particular"] as const

const EMPTY_PATIENT: PatientDraft = {
  name: "",
  dni: "",
  phone: "",
  email: "",
  insurance: "",
  affiliate: "",
  reason: "",
  accepted: false,
}

export { EMPTY_PATIENT, INSURANCES }
export type { PatientDraft }

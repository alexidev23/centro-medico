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

export { EMPTY_PATIENT }
export type { PatientDraft }

type Professional = {
  slug: string
  name: string
  specialty: string
  licence: string
  office: string
  photo: string
  alt: string
}

const PROFESSIONALS: Professional[] = [
  {
    slug: "sofia-ramirez",
    name: "Dra. Sofía Ramírez",
    specialty: "Clínica Médica",
    licence: "M.P. 34.892",
    office: "Consultorio 3",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHV7qUOUHChTk5lrnhKTfJcMhRzlyktf33T-pY0E0Oi796hA2tRiWw2-_SxRmb0tI6hTc2yYwixHYpywuACbJ81saSMdo9zHitqiMCcbgUJrnIK1NTdMdfH_hzS9aob5ljlsJOiGPqjtUplV5NspL3I-X0URcqUAlcDHk5P7SGiJg4Ac7dOAirKkF8WeJ5eapwYe2kA6T8PZ80uriJSKurGth225pLA2XtW4uYfAjjHwtAnIuHfGHy",
    alt: "Dra. Sofía Ramírez, especialista en Clínica Médica",
  },
  {
    slug: "martin-valenzuela",
    name: "Dr. Martín Valenzuela",
    specialty: "Pediatría",
    licence: "M.P. 28.140",
    office: "Consultorio 1",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVuhK7wFsmIqvTHCD4LBMDE3AozAyV40nPunqBd6lSGTjD9hNg1wRFMGq69NNMDU_2b8-V-fYkOP3MBNP2_vsO5nNhD6psMGLWq1TiMb61DK7lkH0dSL1jhPNvSNXjsUqOclWhl9UCrhoOxUg8TgNyRRxAzbTzy0icvb3tFVxFlxdpGtRWan6zugufpSSgNVG6R4nONIFHx4ZRrubNB7_6HEobKAsv489lmRdpUSJYqbOaHtLPOufm",
    alt: "Dr. Martín Valenzuela, especialista en Pediatría",
  },
  {
    slug: "valentina-rossi",
    name: "Dra. Valentina Rossi",
    specialty: "Ginecología",
    licence: "M.P. 41.502",
    office: "Consultorio 4",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuDnSmo-K-XWCfzsx34B2oucUcw1mZ-sPj3-ogL5J0-Lh24OcfvtEhm1lPTI2_4ty5b40ZDu1AGUWwFatYb9bolvvy0PQkB4vH-IsX6B0w2M8KCIBTUp2-Tb7TXIJ-nkdEY2mzfBQVVFfH_OhzSAuWtthViXGzQm19JqypjlHE9GKTPI7h8HULF7EzP8SFnOByyGcS0LvRe0DAoshJql-08i72ora-Bc72ytIo-lJ3aBA9XMjT1tW3",
    alt: "Dra. Valentina Rossi, especialista en Ginecología",
  },
  {
    slug: "camila-montes",
    name: "Dra. Camila Montes",
    specialty: "Dermatología",
    licence: "M.P. 36.904",
    office: "Consultorio 2",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUrQYRCoZOBt20vBSR7vm2as43W17qXFY900JxCz1kdmY2PetMCjFx8fZwMWaogekJ9e57IOyOaRzB_5gOGSILmzotZUFJycv3osiTLXTYYrw4UtMff-rBWF3pjJWls3rocZWeOU4ZiVeDsWrtMPfV2kvy5QdDdW3KePfUA4ccj_tWmIySuKfFaFKjR1i_-pgScmQdVkRvndsdNrT3mbYJQeBHjt0EJJtt6Aw6Q1ua9rk2_md5Sc0D",
    alt: "Dra. Camila Montes, especialista en Dermatología",
  },
  {
    slug: "gonzalo-herrera",
    name: "Lic. Gonzalo Herrera",
    specialty: "Psicología",
    licence: "M.P. 19.831",
    office: "Consultorio 6",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4rCQqB1EvgIX5PjvltDq5Dv1updnq-horIr_YRUwlyAweR5L57lciw2M5hnk9kdmRrO7KGxFpES1WEvLmVk4KLtblQn31cpxfuPd0dE3I7KNuXwoEVo9FQ7alS8-4tx9H03CPjkJtbxtWUmWLhOpV-qCj_8_YPWJyqJ9EiBQPZYOg1JB5bt5UbiVBwOP6moCUWoynS-WMqaDr7j-YzNUC-Oz64yDu_pS54JH8CmrWH_y7FdKKkNHA",
    alt: "Lic. Gonzalo Herrera, especialista en Psicología",
  },
  {
    slug: "lucia-benitez",
    name: "Lic. Lucía Benítez",
    specialty: "Nutrición",
    licence: "M.P. 22.415",
    office: "Consultorio 5",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaAFzSNA9pYoXAPnnuT16FWkkyN2XPomk0CuCD8KcxhhgPqgq3VSeFCCHo4y7-FeHLxfCZ_rFi2SqJvDyIGRtlLKdbxO2KBKIBRq74SvKPNkHfnUI213AoTRq2FBr4FOq9bWiP83_JKOFILmJFdiulsPwqO1CFLWHvfznQVc_2tiaxJLxpfEFgPKMmjyKVo3kOCgLhEE-FX0-DL2Fhnjpyu7vv_xs4IArWwk_QVy4cRTkwoqEwClkg",
    alt: "Lic. Lucía Benítez, especialista en Nutrición",
  },
]

function getProfessionalBySlug(slug: string): Professional | undefined {
  return PROFESSIONALS.find((professional) => professional.slug === slug)
}

export { PROFESSIONALS, getProfessionalBySlug }
export type { Professional }

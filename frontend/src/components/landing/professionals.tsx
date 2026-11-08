import Image from "next/image"
import { Button } from "@/components/ui/button"

type Professional = {
  name: string
  specialty: string
  licence: string
  office: string
  photo: string
  alt: string
}

const PROFESSIONALS: Professional[] = [
  {
    name: "Dra. Sofía Ramírez",
    specialty: "Clínica Médica",
    licence: "M.P. 34.892",
    office: "Consultorio 3",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHV7qUOUHChTk5lrnhKTfJcMhRzlyktf33T-pY0E0Oi796hA2tRiWw2-_SxRmb0tI6hTc2yYwixHYpywuACbJ81saSMdo9zHitqiMCcbgUJrnIK1NTdMdfH_hzS9aob5ljlsJOiGPqjtUplV5NspL3I-X0URcqUAlcDHk5P7SGiJg4Ac7dOAirKkF8WeJ5eapwYe2kA6T8PZ80uriJSKurGth225pLA2XtW4uYfAjjHwtAnIuHfGHy",
    alt: "Dra. Sofía Ramírez, especialista en Clínica Médica",
  },
  {
    name: "Dr. Martín Valenzuela",
    specialty: "Pediatría",
    licence: "M.P. 28.140",
    office: "Consultorio 1",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVuhK7wFsmIqvTHCD4LBMDE3AozAyV40nPunqBd6lSGTjD9hNg1wRFMGq69NNMDU_2b8-V-fYkOP3MBNP2_vsO5nNhD6psMGLWq1TiMb61DK7lkH0dSL1jhPNvSNXjsUqOclWhl9UCrhoOxUg8TgNyRRxAzbTzy0icvb3tFVxFlxdpGtRWan6zugufpSSgNVG6R4nONIFHx4ZRrubNB7_6HEobKAsv489lmRdpUSJYqbOaHtLPOufm",
    alt: "Dr. Martín Valenzuela, especialista en Pediatría",
  },
  {
    name: "Dra. Valentina Rossi",
    specialty: "Ginecología",
    licence: "M.P. 41.502",
    office: "Consultorio 4",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuDnSmo-K-XWCfzsx34B2oucUcw1mZ-sPj3-ogL5J0-Lh24OcfvtEhm1lPTI2_4ty5b40ZDu1AGUWwFatYb9bolvvy0PQkB4vH-IsX6B0w2M8KCIBTUp2-Tb7TXIJ-nkdEY2mzfBQVVFfH_OhzSAuWtthViXGzQm19JqypjlHE9GKTPI7h8HULF7EzP8SFnOByyGcS0LvRe0DAoshJql-08i72ora-Bc72ytIo-lJ3aBA9XMjT1tW3",
    alt: "Dra. Valentina Rossi, especialista en Ginecología",
  },
  {
    name: "Dra. Camila Montes",
    specialty: "Dermatología",
    licence: "M.P. 36.904",
    office: "Consultorio 2",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUrQYRCoZOBt20vBSR7vm2as43W17qXFY900JxCz1kdmY2PetMCjFx8fZwMWaogekJ9e57IOyOaRzB_5gOGSILmzotZUFJycv3osiTLXTYYrw4UtMff-rBWF3pjJWls3rocZWeOU4ZiVeDsWrtMPfV2kvy5QdDdW3KePfUA4ccj_tWmIySuKfFaFKjR1i_-pgScmQdVkRvndsdNrT3mbYJQeBHjt0EJJtt6Aw6Q1ua9rk2_md5Sc0D",
    alt: "Dra. Camila Montes, especialista en Dermatología",
  },
  {
    name: "Lic. Gonzalo Herrera",
    specialty: "Psicología",
    licence: "M.P. 19.831",
    office: "Consultorio 6",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4rCQqB1EvgIX5PjvltDq5Dv1updnq-horIr_YRUwlyAweR5L57lciw2M5hnk9kdmRrO7KGxFpES1WEvLmVk4KLtblQn31cpxfuPd0dE3I7KNuXwoEVo9FQ7alS8-4tx9H03CPjkJtbxtWUmWLhOpV-qCj_8_YPWJyqJ9EiBQPZYOg1JB5bt5UbiVBwOP6moCUWoynS-WMqaDr7j-YzNUC-Oz64yDu_pS54JH8CmrWH_y7FdKKkNHA",
    alt: "Lic. Gonzalo Herrera, especialista en Psicología",
  },
  {
    name: "Lic. Lucía Benítez",
    specialty: "Nutrición",
    licence: "M.P. 22.415",
    office: "Consultorio 5",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaAFzSNA9pYoXAPnnuT16FWkkyN2XPomk0CuCD8KcxhhgPqgq3VSeFCCHo4y7-FeHLxfCZ_rFi2SqJvDyIGRtlLKdbxO2KBKIBRq74SvKPNkHfnUI213AoTRq2FBr4FOq9bWiP83_JKOFILmJFdiulsPwqO1CFLWHvfznQVc_2tiaxJLxpfEFgPKMmjyKVo3kOCgLhEE-FX0-DL2Fhnjpyu7vv_xs4IArWwk_QVy4cRTkwoqEwClkg",
    alt: "Lic. Lucía Benítez, especialista en Nutrición",
  },
]

function ProfessionalCard({
  name,
  specialty,
  licence,
  office,
  photo,
  alt,
}: Professional) {
  return (
    <article className="flex flex-col justify-between gap-md rounded-lg bg-card p-md shadow-card md:p-lg">
      <div className="flex flex-col gap-md">
        <div className="relative h-48 w-full overflow-hidden rounded-lg bg-surface-subtle">
          <Image
            src={photo}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-title-md font-bold text-foreground md:text-headline-sm">
            {name}
          </h3>
          <span className="text-label-lg text-primary">{specialty}</span>
          <div className="mt-xs flex items-center justify-between text-body-sm text-fg-secondary">
            <span>{licence}</span>
            <span>{office}</span>
          </div>
        </div>
      </div>
      <Button type="button" className="w-full">
        Pedir turno
      </Button>
    </article>
  )
}

function Professionals() {
  return (
    <section id="profesionales" className="w-full py-lg md:py-xl">
      <div className="mx-auto flex w-full max-w-page flex-col gap-md px-gutter-mobile md:gap-lg md:px-gutter">
        <div className="flex flex-col gap-xs">
          <span className="text-label-sm font-semibold tracking-wider text-primary uppercase">
            Cuerpo Médico
          </span>
          <h2 className="text-title-md font-bold tracking-tight text-foreground md:text-headline-lg">
            Nuestros profesionales
          </h2>
          <p className="max-w-[36rem] text-body-sm text-fg-secondary md:text-body-md">
            Atención con dedicación exclusiva, rigor clínico y vocación de
            servicio.
          </p>
        </div>
        <div
          id="reservar-turno"
          className="grid scroll-mt-20 grid-cols-1 gap-sm md:grid-cols-2 md:gap-lg md:scroll-mt-24 lg:grid-cols-3"
        >
          {PROFESSIONALS.map((professional) => (
            <ProfessionalCard key={professional.name} {...professional} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Professionals }

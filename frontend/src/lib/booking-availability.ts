type DateKey = string

type MonthCell = {
  key: DateKey
  day: number
  inMonth: boolean
}

type MonthRef = {
  year: number
  month: number
}

const ARGENTINA_TIME_ZONE = "America/Argentina/Cordoba"

const MONTH_FORMATTER = new Intl.DateTimeFormat("es-AR", {
  month: "long",
  timeZone: "UTC",
})

function pad(value: number): string {
  return String(value).padStart(2, "0")
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function toDateKey(date: Date): DateKey {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`
}

function todayKey(now: Date = new Date()): DateKey {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: ARGENTINA_TIME_ZONE,
  }).formatToParts(now)

  const part = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((entry) => entry.type === type)?.value ?? ""

  return `${part("year")}-${part("month")}-${part("day")}`
}

function parseDateKey(key: DateKey): Date {
  const [year, month, day] = key.split("-").map(Number)
  return new Date(Date.UTC(year, month - 1, day, 12))
}

function monthOf(key: DateKey): MonthRef {
  const date = parseDateKey(key)
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 }
}

function monthGrid(year: number, month: number): MonthCell[] {
  const firstOfMonth = new Date(Date.UTC(year, month - 1, 1, 12))
  const mondayOffset = (firstOfMonth.getUTCDay() + 6) % 7

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstOfMonth)
    date.setUTCDate(1 - mondayOffset + index)

    return {
      key: toDateKey(date),
      day: date.getUTCDate(),
      inMonth: date.getUTCMonth() === month - 1,
    }
  })
}

function isSelectableDay(key: DateKey, today: DateKey): boolean {
  if (key < today) {
    return false
  }

  const weekday = parseDateKey(key).getUTCDay()
  return weekday !== 0 && weekday !== 6
}

function formatMonth(year: number, month: number): string {
  const name = MONTH_FORMATTER.format(new Date(Date.UTC(year, month - 1, 1, 12)))
  return `${capitalize(name)} ${year}`
}

export {
  formatMonth,
  isSelectableDay,
  monthGrid,
  monthOf,
  todayKey,
}
export type { DateKey, MonthCell, MonthRef }

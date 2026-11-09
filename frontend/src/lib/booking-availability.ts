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

const LONG_DATE_FORMATTER = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

const DAY_MONTH_FORMATTER = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "UTC",
})

type SlotGroup = {
  label: string
  slots: { time: string; taken: boolean }[]
}

function slotTimes(startMinutes: number, endMinutes: number): string[] {
  const count = (endMinutes - startMinutes) / 30

  return Array.from({ length: count }, (_, index) => {
    const minutes = startMinutes + index * 30
    return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`
  })
}

const MORNING_SLOTS = slotTimes(9 * 60, 13 * 60)
const AFTERNOON_SLOTS = slotTimes(15 * 60, 19 * 60 + 30)
const DAY_SLOTS = [...MORNING_SLOTS, ...AFTERNOON_SLOTS]

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

function shiftMonth({ year, month }: MonthRef, delta: number): MonthRef {
  const date = new Date(Date.UTC(year, month - 1 + delta, 1, 12))
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 }
}

function formatMonth(year: number, month: number): string {
  const name = MONTH_FORMATTER.format(new Date(Date.UTC(year, month - 1, 1, 12)))
  return `${capitalize(name)} ${year}`
}

function formatLongDate(key: DateKey): string {
  return capitalize(LONG_DATE_FORMATTER.format(parseDateKey(key)))
}

function formatDayMonth(key: DateKey): string {
  return DAY_MONTH_FORMATTER.format(parseDateKey(key)).replace(",", "")
}

function daySchedule(key: DateKey): SlotGroup[] {
  const day = parseDateKey(key).getUTCDate()
  const toSlot = (time: string) => ({
    time,
    taken: (day + DAY_SLOTS.indexOf(time)) % 3 === 0,
  })

  return [
    { label: "Turno Mañana (09:00 - 13:00 hs)", slots: MORNING_SLOTS.map(toSlot) },
    { label: "Turno Tarde (15:00 - 19:30 hs)", slots: AFTERNOON_SLOTS.map(toSlot) },
  ]
}

export {
  daySchedule,
  formatDayMonth,
  formatLongDate,
  formatMonth,
  isSelectableDay,
  monthGrid,
  monthOf,
  shiftMonth,
  todayKey,
}
export type { DateKey, MonthCell, MonthRef, SlotGroup }

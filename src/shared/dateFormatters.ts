import dayjs from "dayjs"

/** A date as DD-MM-YYYY (from top-frontend-v2); the placeholder if there is no valid date. */
export function formatDate(
  date?: Date | string | number | null,
  format = "DD-MM-YYYY",
  placeholder?: string,
): string | null {
  const fallbackPlaceholder = placeholder || null

  if (!date) {
    return fallbackPlaceholder
  }

  const parsedDate = dayjs(date)

  if (!parsedDate.isValid()) {
    return fallbackPlaceholder
  }

  return parsedDate.format(format)
}

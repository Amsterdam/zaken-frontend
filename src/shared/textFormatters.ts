/** The text with its first letter as a capital. */
export function capitalize(str?: string) {
  if (typeof str !== "string" || str.length === 0) return ""
  return str[0].toUpperCase() + str.slice(1)
}

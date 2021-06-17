type Separator = "." | "," | "_"
export default (value: string | number, separator: Separator = ".") => {
  if (typeof value === "number") return String(value)
  const regex = new RegExp(`\\${ separator }(?=\\d{3})`, "g")
  return value.replace(regex, "")
}
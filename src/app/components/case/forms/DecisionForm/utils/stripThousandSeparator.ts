type Separator = "." | "," | "_"
export default (str: string, separator: Separator = ".") => {
  const regex = new RegExp(`\\${ separator }(?=\\d{3})`, "g")
  return str.replace(regex, "")
}
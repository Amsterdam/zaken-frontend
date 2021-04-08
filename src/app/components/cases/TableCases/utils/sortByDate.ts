type Direction = "ASC" | "DESC"
export default (direction: Direction = "ASC") => (d: string, dd: string) => {
  const first = direction === "ASC" ? d : dd
  const second = direction === "ASC" ? dd : d
  return new Date(first).getTime() - new Date(second).getTime()
}
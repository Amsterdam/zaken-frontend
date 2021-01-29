export default (param: string | undefined) => {
  const int = parseInt(param ?? "", 10)
  if (Number.isNaN(int) || int <= 0) return undefined
  return int
}
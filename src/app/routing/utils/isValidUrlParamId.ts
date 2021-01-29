export default (param: string | undefined): param is string => {
  const int = parseInt(param ?? "", 10)
  return Number.isNaN(int) === false && int > 0
}
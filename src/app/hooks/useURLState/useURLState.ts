import { useState, useCallback } from "react"

// TODO: Generic type
const defaultParse = (value: string | null) => value ?? ""

const useURLState = (
  key: string, initialValue = "", parse = defaultParse, allowEmptyString = false
) => {
  const urlParams = new URLSearchParams(window.location.search)
  const param = parse(urlParams.get(key))
  const [value, setValue] = useState(param || initialValue)
  const stableParse = useCallback(parse, [])

  const set = useCallback((value: string) => {
    const v = stableParse(value)
    setValue(v)
    if (!allowEmptyString && v === "") {
      urlParams.delete(key)
    } else {
      urlParams.set(key, v)
    }
    const s = urlParams.toString()
    const queryString = s !== "" ? `?${ s }` : ""
    const url = `${ window.location.pathname }${ queryString }`
    window.history.replaceState({}, "", url)
  }, [key, stableParse, urlParams, allowEmptyString])

  return [value, set] as const
}

export default useURLState

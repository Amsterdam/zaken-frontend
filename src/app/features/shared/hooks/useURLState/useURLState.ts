import { useState, useCallback } from "react"

// TODO: Polyfill for URLSearchParams for IE11
// LINK: https://caniuse.com/urlsearchparams

const defaultParse = (value: string | null) => value ?? ""

export default (key: string, parse = defaultParse) => {
  // TODO: enable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const urlParams = new URLSearchParams(window.location.search)
  const param = parse(urlParams.get(key))
  const [value, setValue] = useState(param)
  // TODO: enable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableParse = useCallback(parse, [])
  const set = useCallback((value: string) => {
    const v = stableParse(value)
    setValue(v)
    if (v === "") {
      urlParams.delete(key)
    } else {
      urlParams.set(key, v)
    }
    const s = urlParams.toString()
    const queryString = s !== "" ? `?${ s }` : ""
    const url = `${ window.location.pathname }${ queryString }`
    window.history.replaceState({}, "", url)
  }, [key, stableParse, urlParams])
  return [value, set] as const
}

import { useState, useCallback } from "react"

// TODO: Generic type
const defaultParse = (value: string | null) => value ?? ""

const useURLState = (
  key: string,
  initialValue = "",
  parse = defaultParse,
  allowEmptyString = false,
) => {
  // TODO: enable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const urlParams = new URLSearchParams(window.location.search)
  const param = parse(urlParams.get(key))
  const [value, setValue] = useState(param || initialValue)

  const set = useCallback(
    (value: string) => {
      const v = parse(value)
      setValue(v)
      if (!allowEmptyString && v === "") {
        urlParams.delete(key)
      } else {
        urlParams.set(key, v)
      }
      const s = urlParams.toString()
      const queryString = s !== "" ? `?${s}` : ""
      const url = `${window.location.pathname}${queryString}`
      window.history.replaceState({}, "", url)
    },
    [key, parse, urlParams, allowEmptyString],
  )

  return [value, set] as const
}

export default useURLState

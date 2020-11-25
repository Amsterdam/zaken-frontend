import { useState, useCallback } from "react"

export default (key: string) => {
  const urlParams = new URLSearchParams(window.location.search)
  const [value, setValue] = useState(urlParams.get(key) ?? "")
  const set = useCallback((value: string) => {
    const v = value.trim()
    setValue(v)
    if (v === "") {
      urlParams.delete(key)
    } else {
      urlParams.set(key, v)
    }
    const s = urlParams.toString()
    window.history.pushState(urlParams, document.title, `${ s !== "" ? "?" : "" }${ s }`)
  }, [key, urlParams])
  return [value, set] as const
}

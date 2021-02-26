import { useEffect } from "react"

import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import { useCase } from "app/state/rest"

export default (id: number | undefined) => {

  const valid = isValidUrlParamId<Components.Schemas.Case["id"]>(id)

  const [caseItem, { execGet, isBusy }] = useCase(id, { lazy: true })

  useEffect(() => {
    if (valid === false) return
    execGet()
  }, [valid, execGet])

  if (valid === false) return false
  if (isBusy) return undefined
  return caseItem !== undefined
}
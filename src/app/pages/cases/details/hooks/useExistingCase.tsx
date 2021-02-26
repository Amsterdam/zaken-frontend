import { useEffect } from "react"

import isValidUrlParamId from "app/routing/utils/isValidUrlParamId"
import { useCase } from "app/state/rest"

export default (oId: number | undefined): [boolean, boolean, Components.Schemas.Case["id"]] => {

  const valid = isValidUrlParamId<Components.Schemas.Case["id"]>(oId)

  const [caseItem, { execGet, isBusy }] = useCase(oId, { lazy: true })
  const exists = !isBusy && caseItem !== undefined

  useEffect(() => {
    if (valid === false) return
    execGet()
  }, [valid, execGet])

  return [exists, isBusy, oId!]
}
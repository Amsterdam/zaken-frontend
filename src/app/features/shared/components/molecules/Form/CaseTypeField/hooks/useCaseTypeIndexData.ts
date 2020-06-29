import { useEffect } from "react"

import { useGlobalState, useGlobalActions } from "app/state/state/globalState"

/**
 * Returns data, and kicks of an index onMount.
 */
export const useCaseTypeIndexData = () => {
  const { caseTypes: { index } } = useGlobalActions()
  const { caseTypes: { isFetching, data } } = useGlobalState()

  useEffect(() => {
    index()
  }, [index])

  return { isFetching, data }
}

import { useCallback, useEffect } from "react"

import useGlobalActions from "app/state/state/useGlobalActions"
import useGlobalState from "app/state/state/useGlobalState"

/**
 * Returns data, and kicks of an index onMount.
  */
export const useCaseIndexData = () => {
  const { cases } = useGlobalActions()
  const { cases: { isFetching, data } } = useGlobalState()

  // TODO this useCallback should not be necessary and should be moved to globalstate-hooks
  const index = useCallback(() => cases.index(), []) // eslint-disable-line

  useEffect(() => {
    index()
  }, [index])

  return { isFetching, data }
}

import { useEffect } from "react"

import useGlobalActions from "app/state/state/useGlobalActions"
import useGlobalState from "app/state/state/useGlobalState"

/**
 * Returns data, and kicks of an index onMount.
  */
export const useCaseIndexData = () => {
  const { cases: { index } } = useGlobalActions()
  const { cases: { isFetching, data } } = useGlobalState()

  useEffect(() => {
    index()
  }, [index])
  return { isFetching, data }
}

import { useEffect, useState } from "react"

import { Permit } from "app/state/rest/types/Permit"

/**
 * Mock permit API:
 */
const usePermit = (caseId: NonNullable<API.Case["identification"]>) => {
  const [ isBusy, setIsBusy ] = useState(true)
  const [ data, setData ] = useState<Permit | undefined>(undefined)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData({ bedBreakfast:true, holidayRental: true })
      setIsBusy(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [ setIsBusy, setData ])

  return { isBusy, data }
}

export default usePermit

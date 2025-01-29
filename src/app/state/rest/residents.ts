import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "react-oidc-context"
import { makeApiUrl } from "./hooks/utils/apiUrl"
import { useOboToken } from "./tokenOboService"
import { env } from "app/config/env"

export const useResidents = (bagId: Components.Schemas.Address["bag_id"]) => {
  const auth = useAuth()
  const [isBusy, setIsBusy] = useState<boolean>(false)
  const { fetchOboToken } = useOboToken(env.VITE_OIDC_OBO_SCOPE_BRP)
  const [data, setData] = useState<Components.Schemas.Residents | undefined>(
    undefined
  )
  const [mksError, setMKSError] = useState(null)
  const [myAccessError, setMyAccessError] = useState(null)

  const url = makeApiUrl("addresses", bagId, "residents")

  const fetchResidents = useCallback(
    (oboToken: string) => {
      setIsBusy(true)
      axios
        .post(
          url,
          {
            obo_access_token: oboToken
          },
          {
            headers: {
              Authorization: `Bearer ${ auth.user?.access_token }`
            }
          }
        )
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          if (error.status === 403) {
            setMKSError(error?.response?.data?.message || error?.message)
          }
        })
        .finally(() => {
          setIsBusy(false)
        })
    },
    [url, auth.user?.access_token]
  )

  useEffect(() => {
    fetchOboToken()
    .then((oboToken) => {
      fetchResidents(oboToken)
    })
    .catch((error) => {
      setMyAccessError(error?.response?.data?.message || error?.message)
    })
  }, [fetchOboToken, fetchResidents])

  return [ data, { isBusy, mksError, myAccessError }] as const
}

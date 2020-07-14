import React, { useEffect } from "react"
import qs from "qs"
import axios from "axios"
import { useLocation, navigate } from "@reach/router"
import slashSandwich from "slash-sandwich"

import to from "app/features/shared/routing/to"
import { setToken } from "app/state/auth/tokenStore"

const OIDCAuthUrl = slashSandwich([
  process.env.REACT_APP_GATEWAY,
  "oidc-authenticate"
])

const CallbackPage: React.FC = () => {
  const { search } = useLocation()
  const { code } = qs.parse(search, { ignoreQueryPrefix: true })

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    axios
      .post(OIDCAuthUrl, { code }, { cancelToken: cancelToken.token })
      .then(response => {
        setToken(response.data.access)
        return navigate(to("/"))
      })
      .catch(error => console.log("Something went wrong", error))

    // Cancel request onUnmount
    return () => cancelToken.cancel()
  }, [ code ])

  return null
}

export default CallbackPage

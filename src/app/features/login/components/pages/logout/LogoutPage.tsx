import React, { useEffect } from "react"
import { navigate } from "@reach/router"

import to from "app/features/shared/routing/to"
import { clearToken } from "app/state/auth/tokenStore"

const LogoutPage: React.FC = () => {
  useEffect(() => {
    clearToken()
    navigate(to("/login"))
  }, [])

  return <></>
}

export default LogoutPage

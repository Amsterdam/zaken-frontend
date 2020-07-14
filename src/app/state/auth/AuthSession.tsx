import React, { useEffect } from "react"
import jwtDecode from "jwt-decode"
import { navigate } from "@reach/router"

import to from "app/features/shared/routing/to"

import { getToken, clearToken } from "./tokenStore"

const AuthSession: React.FC = () => {
  useEffect(() => {
    const intervalHandle = setInterval(() => {
      const token = getToken()
      if (token) {
        const decoded = jwtDecode(token) as { exp: number }

        if (decoded.exp * 1000 < Date.now()) {
          console.log("SESSION EXPIRED")
          clearToken()
          navigate(to("/login"))
        }
      }
    }, 1000)
    return () => clearInterval(intervalHandle)
  }, [])

  return null
}

export default AuthSession

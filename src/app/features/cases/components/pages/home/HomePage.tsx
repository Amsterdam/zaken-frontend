import React, { useEffect } from "react"
import { navigate, RouteComponentProps } from "@reach/router"

import to from "app/features/shared/routing/to"

const HomePage: React.FC<RouteComponentProps> = () => {
  // <Redirect to={to("/cases")} /> sometimes throws errors:
  // @see https://github.com/reach/router/issues/100#issuecomment-414312284

  useEffect(() => { navigate(to("/cases"), { replace: true }) }, [])
  return null
}

export default HomePage

import React from "react"
import { Router as ReachRouter } from "@reach/router"

import routes from "app/config/routes"

const Router: React.FC = () => (
  <ReachRouter>
    {
      Object
        .entries(routes)
        .map(([path, Page]) => <Page key={path} path={path} />)
    }
  </ReachRouter>
)

export default Router

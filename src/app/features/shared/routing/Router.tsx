import React from "react"
import { Router as ReachRouter } from "@reach/router"

import routes from "app/config/routes"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

const allowList = /^\/login|^\/authentication/

const Router: React.FC = () => (
  <ReachRouter>
    {
      // Pages that do NOT match the allowList are protected
      Object
        .entries(routes)
        .filter(([path]) => !path.match(allowList))
        .map(([path, Page]) => <ProtectedRoute page={Page} key={path} path={path} />)
    }
    {
      // Pages that do match the allowList are NOT protected
      Object
        .entries(routes)
        .filter(([path]) => path.match(allowList))
        .map(([path, Page]) => <Page key={path} path={path} />)
    }
    <NotFoundPage default />
  </ReachRouter>
)

export default Router

import React from "react"
import { Router as ReachRouter } from "@reach/router"

import routes from "app/config/routes"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

const Router: React.FC = () => (
  <ReachRouter>
    {
      Object
        .entries(routes)
        .map(([path, { publicly, Page }]) =>
          publicly ?
            <Page key={path} path={path} /> :
            <ProtectedRoute key={path} path={path} page={Page} />)
    }
    <NotFoundPage default />
  </ReachRouter>
)

export default Router

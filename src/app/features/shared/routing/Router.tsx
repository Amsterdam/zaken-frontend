import React from "react"
import { Router as ReachRouter } from "@reach/router"

import routes from "app/config/routes"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFoundPage from "app/features/shared/components/pages/NotFoundPage"

const allowed = ["login", "authentication"]
const isAllowed = (path: string) => {
  const p = path.split("/").filter(_ => _ !== "")[0]
  return allowed.includes(p)
}

const Router: React.FC = () => (
  <ReachRouter>
    {
      Object
        .entries(routes)
        .map(([path, Page]) =>
          isAllowed(path) ?
            <Page key={path} path={path} /> :
            <ProtectedRoute page={Page} key={path} path={path} />)
    }
    <NotFoundPage default />
  </ReachRouter>
)

export default Router

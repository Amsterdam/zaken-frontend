
import { Router as ReachRouter } from "@reach/router"

import routes from "app/routing/routes"
import ProtectedRoute from "./ProtectedRoute"
import NotFoundPage from "app/pages/errors/NotFoundPage"

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

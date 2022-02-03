
import { Router as ReachRouter } from "@reach/router"

import routes from "app/routing/routes"
import ProtectedPage from "./ProtectedPage"
import NotFoundPage from "app/pages/errors/NotFoundPage"

const Router: React.FC = () => (
  <ReachRouter>
    {
      Object
        .entries(routes)
        .map(([path, { publicly, Page, permissionNames }]) => (
          publicly ? <Page key={path} path={path} />
            : (
              <ProtectedPage
                key={path}
                path={path}
                page={Page}
                permissionNames={permissionNames}
              />
            )
          )
        )
    }
    <NotFoundPage default />
  </ReachRouter>
)

export default Router

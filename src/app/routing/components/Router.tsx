
import { Router as ReachRouter } from "@reach/router"

import routes from "app/routing/routes"
import ProtectedPage from "./ProtectedPage"
import NotFoundPage from "app/pages/errors/NotFoundPage"

const Router: React.FC = () => (
  <ReachRouter>
    {
      Object
        .entries(routes)
        .map(([path, { publicly, Page, permissionName }]) =>
          publicly ?
            <Page key={path} path={path} /> :
            <ProtectedPage key={path} path={path} page={Page} permissionName={permissionName} />)
    }
    <NotFoundPage default />
  </ReachRouter>
)

export default Router

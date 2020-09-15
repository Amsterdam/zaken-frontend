import loginRoutes from "../features/login/routes"
import searchRoutes from "../features/search/routes"
import casesRoutes from "../features/cases/routes"
import caseVisitsRoutes from "../features/caseVisits/routes"

import routesToRouteConfig from "./utils/routesToRouteConfig"

// NOTE: Add feature routes here
const routes = {
  ...loginRoutes,
  ...searchRoutes,
  ...casesRoutes,
  ...caseVisitsRoutes
}

const routesObject = routesToRouteConfig(routes)
export type Routes = typeof routesObject
export default routesObject

import loginRoutes from "../features/login/routes"
import searchRoutes from "../features/search/routes"
import addressesRoutes from "../features/addresses/routes"
import casesRoutes from "../features/cases/routes"
import caseVisitsRoutes from "../features/caseVisits/routes"

import routesToRouteConfig from "./utils/routesToRouteConfig"

// NOTE: Add feature routes here
const routes = {
  ...loginRoutes,
  ...addressesRoutes,
  ...searchRoutes,
  ...casesRoutes,
  ...caseVisitsRoutes
}

const routesObject = routesToRouteConfig(routes)
if (process.env.NODE_ENV === "development") console.log("Routes:", routesObject)
export type Routes = typeof routesObject
export default routesObject

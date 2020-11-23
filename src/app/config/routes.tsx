import authRoutes from "../features/auth/routes"
import searchRoutes from "../features/search/routes"
import addressesRoutes from "../features/addresses/routes"
import casesRoutes from "../features/cases/routes"
import caseVisitsRoutes from "../features/caseVisits/routes"

import routesToRouteConfig, { RouteConfigObject } from "./utils/routesToRouteConfig"

// NOTE: Add feature routes here
const routes = {
  ...authRoutes,
  ...addressesRoutes,
  ...searchRoutes,
  ...casesRoutes,
  ...caseVisitsRoutes
}

const routesObject = routesToRouteConfig(routes as RouteConfigObject, [{ title: "Home", path: "/" }])
if (process.env.NODE_ENV === "development") console.log("Routes:", routesObject)
export type Routes = typeof routesObject
export default routesObject

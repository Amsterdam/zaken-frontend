import authRoutes from "../pages/auth/routes"
import searchRoutes from "../pages/search/routes"
import addressesRoutes from "../pages/addresses/routes"
import casesRoutes from "../pages/cases/routes"
import helpRoutes from "../pages/help/routes"
import fineRoutes from "../pages/fines/routes"
import homeRoutes from "../pages/home/routes"

import routesToRouteConfig, { RouteConfigObject } from "./utils/routesToRouteConfig"

// NOTE: Add feature routes here
const routes = {
  ...authRoutes,
  ...searchRoutes,
  ...addressesRoutes,
  ...casesRoutes,
  ...helpRoutes,
  ...fineRoutes
}

const homeRoutesObject = routesToRouteConfig(homeRoutes, [])
const routesObject = routesToRouteConfig(routes as RouteConfigObject, homeRoutesObject["/"].path, homeRoutesObject)
if (process.env.NODE_ENV === "development") console.log("Routes:", routesObject)
export type Routes = typeof routesObject
export default routesObject

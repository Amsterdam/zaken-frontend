import authRoutes from "../pages/auth/routes"
import addressesRoutes from "../pages/addresses/routes"
import casesRoutes from "../pages/cases/routes"
import tasksRoutes from "../pages/tasks/routes"
import helpRoutes from "../pages/help/routes"
import fineRoutes from "../pages/fines/routes"
import homeRoutes from "../pages/home/routes"
import tonRoutes from "../pages/ton/routes"

import routesToRouteConfig, { RouteConfigObject } from "./utils/routesToRouteConfig"

// NOTE: Add feature routes here
const routes = {
  ...authRoutes,
  ...addressesRoutes,
  ...casesRoutes,
  ...tasksRoutes,
  ...helpRoutes,
  ...fineRoutes,
  ...tonRoutes
}

const homeRoutesObject = routesToRouteConfig(homeRoutes, [])
const routesObject = routesToRouteConfig(routes as RouteConfigObject, homeRoutesObject["/"].path, homeRoutesObject)
if (process.env.NODE_ENV === "development") console.log("Routes:", routesObject)
export type Routes = typeof routesObject
export default routesObject

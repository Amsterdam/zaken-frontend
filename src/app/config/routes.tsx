import loginRoutes from "../features/login/routes"
import caseVisitsRoutes from "../features/caseVisits/routes"
import casesRoutes from "../features/cases/routes"
import routesToRouteConfig from "./utils/routesToRouteConfig"

// NOTE: Add feature routes here
const routes = {
  ...loginRoutes,
  ...casesRoutes,
  ...caseVisitsRoutes
}

const routesObject = routesToRouteConfig(routes)
export type Routes = typeof routesObject
export default routesObject

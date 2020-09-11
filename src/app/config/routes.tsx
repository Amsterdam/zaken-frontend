import { FC } from "react"
import type { RouteComponentProps } from "@reach/router"
import loginRoutes from "../features/login/routes"
import caseVisitsRoutes from "../features/caseVisits/routes"
import casesRoutes from "../features/cases/routes"

type Page = FC<RouteComponentProps>
type RouteConfig = { publicly: boolean, Page: Page }

const toRouteConfig = (config: RouteConfig | Page): RouteConfig =>
  "Page" in config ? config : { publicly: false, Page: config }

const routesToRouteConfig = (routes: Record<string, RouteConfig | Page>) =>
  Object.keys(routes).reduce((acc, key) => {
    acc[key] = toRouteConfig(routes[key])
    return acc
  }, {} as Record<string, RouteConfig>)

// NOTE: Add feature routes here
const routes = {
  ...loginRoutes,
  ...casesRoutes,
  ...caseVisitsRoutes
}

const routesObject = routesToRouteConfig(routes)
export type Routes = typeof routesObject
export default routesObject

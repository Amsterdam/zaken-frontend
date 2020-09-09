import { FC } from "react"
import loginRoutes from "../features/login/routes"
import caseVisitsRoutes from "../features/caseVisits/routes"
import casesRoutes from "../features/cases/routes"

import type { RouteComponentProps } from "@reach/router"
type Page = FC<RouteComponentProps>

//export type Route = Record<string, Page>
//export type ProtectedRoute = Record<string, { public: boolean, page: Page }

const allRoutes = [
  loginRoutes,
  casesRoutes,
  caseVisitsRoutes
]
const routesObject = allRoutes.reduce((routes, acc) => ({
    ...acc,
    ...routes
  }), {} as Record<string, Page>)

export type Routes = typeof routesObject
export default routesObject

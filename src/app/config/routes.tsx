import loginRoutes from "../features/login/routes"
import caseVisitsRoutes from "../features/caseVisits/routes"
import casesRoutes from "../features/cases/routes"

const routes = {
  // NOTE: add your own feature here for routing.
  ...loginRoutes,
  ...casesRoutes,
  ...caseVisitsRoutes
}

export type Routes = typeof routes
export default routes

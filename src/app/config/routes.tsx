import casesRoutes from "../features/cases/routes"
import loginRoutes from "../features/login/routes"

const routes = {
  // NOTE: add your own feature here for routing.
  ...casesRoutes,
  ...loginRoutes
}

export type Routes = typeof routes
export default routes

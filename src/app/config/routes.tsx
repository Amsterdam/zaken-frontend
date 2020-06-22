import POCRoutes from "../features/poc/routes"

const routes = {
  // NOTE: add your own feature here for routing.
  ...POCRoutes
}

export type Routes = typeof routes
export default routes

import { matchRoutes } from "react-router"
import { type RouteHandle, routes } from "./routes"

const titleOf = (handle: unknown) => (handle as RouteHandle | undefined)?.title

/**
 * The routes on the way to a path that have a title, from the start page down
 * to the page itself: the path of the breadcrumbs.
 */
export const getTitledRoutes = (pathname: string) =>
  (matchRoutes(routes, pathname) ?? []).flatMap(({ route, pathname }) => {
    const title = titleOf(route.handle)
    return title === undefined ? [] : [{ route, title, href: pathname }]
  })

/** The title of the page on a path; a page without one (e.g. the 404) has none. */
export const getPageTitle = (pathname: string) => {
  const matches = matchRoutes(routes, pathname) ?? []
  const last = matches[matches.length - 1]
  // An index route is the page of the route above it.
  const page = last?.route.index ? matches[matches.length - 2] : last

  return titleOf(page?.route.handle)
}

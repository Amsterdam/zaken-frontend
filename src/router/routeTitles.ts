import { matchRoutes, type RouteObject } from "react-router"

/**
 * What a route says about itself. Its title is the title of the browser tab
 * and its name in the breadcrumbs; the routes above it are the path to it.
 */
export type RouteHandle = {
  title: string
}

/**
 * The routes, handed over by routes.tsx. This file does not import them: the
 * pages import the layout, which uses these titles, and routes.tsx imports the
 * pages. That circle would make Vite reload the whole page on every change to
 * a page, instead of only replacing the page (HMR).
 */
let routes: RouteObject[] = []

export const setRoutes = (value: RouteObject[]) => {
  routes = value
}

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

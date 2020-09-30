import { FC } from "react"
import type { RouteComponentProps } from "@reach/router"
import * as Assets from "@datapunt/asc-assets"
import slashSandwich from "slash-sandwich"

type Page = FC<RouteComponentProps>
type RouteConfig = {
  Page: Page
  publicly?: boolean
  title?: string
  icon?: keyof typeof Assets
  subRoutes?: Record<string, RouteConfig | Page>
}
export type RouteConfigObject = Record<string, RouteConfig | Page>
type Path = (Pick<RouteConfig, "title" | "icon"> & { path: string })[]
type RouteConfigWithPath = RouteConfig & { path: Path }

const toRouteConfig = (config: RouteConfig | Page): RouteConfig => "Page" in config ?
    { publicly: false, ...config } :
    { publicly: false, Page: config }

const addPathToRouteConfig = (config: RouteConfig, key: string, p: Path): RouteConfigWithPath => {
  const path = p.concat({ title: config.title, icon: config.icon, path: key })
  return { ...config, path }
}

export default (routes: RouteConfigObject, path: Path) =>
  Object.keys(routes).reduce((acc, key) => {
    const route = routes[key]
    const k = slashSandwich([key], { trailingSlash: true })
    const routeConfigWithPath = addPathToRouteConfig(toRouteConfig(route), k, path)
    acc[k] = routeConfigWithPath
    Object.keys(routeConfigWithPath.subRoutes ?? {}).forEach(subKey => {
      const config = routeConfigWithPath.subRoutes?.[subKey]
      if (config === undefined) return
      const k = slashSandwich([key, subKey], { trailingSlash: true })
      acc[k] = addPathToRouteConfig(toRouteConfig(config), k, routeConfigWithPath.path)
    })
    return acc
  }, {} as Record<string, RouteConfigWithPath>)

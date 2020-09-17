import { FC } from "react"
import type { RouteComponentProps } from "@reach/router"
import slashSandwich from "slash-sandwich"

type Page = FC<RouteComponentProps>
type RouteConfig = {
  Page: Page
  publicly?: boolean
  subRoutes?: Record<string, RouteConfig | Page>
}

const toRouteConfig = (config: RouteConfig | Page): RouteConfig =>
  "Page" in config ?
    { publicly: false, ...config } :
    { publicly: false, Page: config }

export default (routes: Record<string, RouteConfig | Page>) =>
  Object.keys(routes).reduce((acc, key) => {
    const route = routes[key]
    const routeConfig = toRouteConfig(route)
    acc[key] = routeConfig
    Object.keys(routeConfig.subRoutes ?? {}).forEach(subKey => {
      const config = routeConfig.subRoutes?.[subKey]
      if (config === undefined) return
      acc[slashSandwich([key, subKey])] = toRouteConfig(config)
    })
    return acc
  }, {} as Record<string, RouteConfig>)

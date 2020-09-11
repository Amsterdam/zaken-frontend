import { FC } from "react"
import type { RouteComponentProps } from "@reach/router"
type Page = FC<RouteComponentProps>
type RouteConfig = { publicly: boolean, Page: Page }

const toRouteConfig = (config: RouteConfig | Page): RouteConfig =>
  "Page" in config ? config : { publicly: false, Page: config }

export default (routes: Record<string, RouteConfig | Page>) =>
  Object.keys(routes).reduce((acc, key) => {
    acc[key] = toRouteConfig(routes[key])
    return acc
  }, {} as Record<string, RouteConfig>)

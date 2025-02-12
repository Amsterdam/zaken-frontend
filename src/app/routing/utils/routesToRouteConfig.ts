
import { CustomIconProps } from "app/components/shared/CustomIcon/CustomIcon"
import slashSandwich from "./slashSandwich"

export type RouteConfigObject = Record<string, RouteConfig | Page>
export type Page = React.FC<{}>;
type RouteConfig = {
  Page: Page
  publicly?: boolean
  title?: string
  icon?: CustomIconProps["name"]
  subRoutes?: RouteConfigObject
  permissionNames?: Components.Schemas.PermissionsEnum[]
}
type Path = (Pick<RouteConfig, "title" | "icon"> & { path: string })[]
type RouteConfigWithPath = RouteConfig & { path: Path }

const toRouteConfig = (config: RouteConfig | Page): RouteConfig => (
  "Page" in config ? { publicly: false, ...config }
    : { publicly: false, Page: config }
)

const addPathToRouteConfig = (config: RouteConfig, key: string, p: Path): RouteConfigWithPath => {
  const path = p.concat({ title: config.title, icon: config.icon, path: key })
  return { ...config, path }
}

const routesToRouteConfig = (
  routes: RouteConfigObject, path: Path, routeConfig: Record<string, RouteConfigWithPath> = {}, basePath = "/"
): Record<string, RouteConfigWithPath> => (
  Object.keys(routes).reduce((acc, key) => {
    const route = routes[key]
    const k = slashSandwich([basePath, key], { trailingSlash: true })
    const routeConfigWithPath = addPathToRouteConfig(toRouteConfig(route), k, path)
    acc[k] = routeConfigWithPath
    return routesToRouteConfig(routeConfigWithPath.subRoutes ?? {}, routeConfigWithPath.path, acc, k)
  }, routeConfig)
)

export default routesToRouteConfig

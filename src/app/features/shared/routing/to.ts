import { ComponentProps, ComponentType } from "react"
import { Routes } from "app/config/routes"

// RouteParams for given K in Routes
type RouteParams<T extends Routes, K extends keyof T> =
  // ... value for K should be a Component:
  T[K] extends ComponentType<any>
    // We're only interested in parameters that are either a string or a  number
    ? Omit<ComponentProps<T[K]>, "children"> extends { [key: string]: string|number }
        ? Omit<ComponentProps<T[K]>, "children">
        : never
    // Don't allow anything else than Components. As we cannot safely extract component-props on anything other than a Component
    : never

/**
 * Example:
 * applyRouteParams('/foo/:id/', { id: 100 });       =>      "/foo/100/"
 */
const applyRouteParams = <T extends Routes, K extends keyof T>
  (url: string, params: RouteParams<T, K>): string =>
    Object
      .entries(params)
      .reduce(
        (url, [key, value]) => url.replace(`:${ key }`, value.toString()),
        url
      )

/**
 * Typesafe routes.
 * Usage: `to("/foo/:id/", { id: 100 })`
 *
 * NOTE: Type-errors will occur when "/foo/:id" does not exit, or when the related Page-component does not accept an `id` property
 */
const to = <T extends Routes, K extends keyof T>
  (path: K, params?: RouteParams<T, K>) =>
    params !== undefined
      ? applyRouteParams(path.toString(), params)
      : path

export default to

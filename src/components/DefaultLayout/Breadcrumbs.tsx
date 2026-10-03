import { type MouseEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Breadcrumb, Grid } from "@amsterdam/design-system-react"
import to from "app/routing/utils/to"
import find from "app/routing/utils/find"
import routes from "app/routing/routes"

/**
 * The path to the current page, from the route config (same as the old
 * asc-ui BreadCrumbs). Only shown below the top level.
 */
export function Breadcrumbs() {
  const routeParams = useParams()
  const navigate = useNavigate()
  const route = find(routes, window.location.pathname)
  const items = (route ? (routes[route].path ?? []) : [])
    .filter((item) => item.title !== undefined)
    .map((item) => ({ title: item.title, href: to(item.path, routeParams) }))

  if (items.length <= 1) return null

  const navigateTo = (href: string) => (event: MouseEvent) => {
    event.preventDefault()
    navigate(href)
  }

  return (
    <Grid.Cell span="all" appearance="transparent">
      <Breadcrumb>
        {items.map(({ title, href }) => (
          <Breadcrumb.Link key={href} href={href} onClick={navigateTo(href)}>
            {title}
          </Breadcrumb.Link>
        ))}
      </Breadcrumb>
    </Grid.Cell>
  )
}

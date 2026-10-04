import { type MouseEvent } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Breadcrumb, Grid } from "@amsterdam/design-system-react"
import to from "app/routing/utils/to"
import find from "app/routing/utils/find"
import routes from "app/routing/routes"
import { type LinkState } from "./RouterLink"

type Item = { title?: string; href: string }

/**
 * The path to the current page. By default from the route config (same as the
 * old asc-ui BreadCrumbs): "Home / Zakenoverzicht / Zaakdetails". When you
 * came from another page via a link (the tasks overview, an address), that
 * page takes the place of the pages in between: "Home / Takenoverzicht /
 * Zaakdetails". Only shown on nested pages: a page directly below home (e.g.
 * /hulp) has no breadcrumbs.
 */
export function Breadcrumbs() {
  const routeParams = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const route = find(routes, window.location.pathname)
  const path = route ? (routes[route].path ?? []) : []
  const defaultItems: Item[] = path
    .filter((item) => item.title !== undefined)
    .map((item) => ({ title: item.title, href: to(item.path, routeParams) }))

  if (path.length <= 2 || defaultItems.length <= 1) return null

  // The page you came from, when it is not already on the default path.
  const from = (state as LinkState | null)?.from
  const fromRoute = from ? find(routes, from.split("?")[0]) : undefined
  const fromTitle = fromRoute ? routes[fromRoute].title : undefined
  const isOnDefaultPath = path.some((item) => item.path === fromRoute)
  const items: Item[] =
    from && fromTitle && !isOnDefaultPath
      ? [
          defaultItems[0],
          { title: fromTitle, href: from },
          defaultItems[defaultItems.length - 1],
        ]
      : defaultItems

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

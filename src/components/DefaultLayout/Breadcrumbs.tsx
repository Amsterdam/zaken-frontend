import { type MouseEvent } from "react"
import { useLocation, useNavigate } from "react-router"
import { Breadcrumb, Grid } from "@amsterdam/design-system-react"
import { getTitledRoutes } from "@/router/routeTitles"
import { type LinkState } from "./RouterLink"

type Item = { title: string; href: string }

/**
 * The path to the current page. By default from the routes: "Home /
 * Zakenoverzicht / Zaakdetails". When you came from another page via a link
 * (the tasks overview, an address), that page takes the place of the pages in
 * between: "Home / Takenoverzicht / Zaakdetails". Only shown on nested pages:
 * a page directly below home (e.g. /hulp) has no breadcrumbs.
 */
export function Breadcrumbs() {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const path = getTitledRoutes(pathname)

  if (path.length <= 2) return null

  // The page you came from, when it is not already on the default path.
  const from = (state as LinkState | null)?.from
  const fromRoutes = from ? getTitledRoutes(from.split("?")[0]) : []
  const fromPage = fromRoutes[fromRoutes.length - 1]
  const isOnDefaultPath = path.some(({ route }) => route === fromPage?.route)
  const items: Item[] =
    from && fromPage && !isOnDefaultPath
      ? [path[0], { title: fromPage.title, href: from }, path[path.length - 1]]
      : path

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

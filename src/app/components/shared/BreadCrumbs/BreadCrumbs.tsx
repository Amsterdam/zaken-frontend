import styled from "styled-components"
import { Link, useParams } from "@reach/router"
import { Breadcrumbs } from "@amsterdam/asc-ui"
import to from "app/routing/utils/to"
import find from "app/routing/utils/find"
import routes from "app/routing/routes"

type BreadCrumbsItem = {
  title: string
  to: string
  path: string
}

const StyledBreadcrumbs = styled(Breadcrumbs)`
  padding-inline-start: 0;
`

const BreadCrumbs: React.FC = () => {

  const routeParams = useParams() ?? {}
  const route = find(routes, window.location.pathname)

  const pageConfig = route ? routes[route] : undefined
  const pathItems = pageConfig?.path?.map(item => ({ ...item, to: to(item.path, routeParams) })) ?? []
  const items = pathItems.filter((item): item is BreadCrumbsItem => item.title !== undefined && item.to !== undefined)

  return (
    items.length > 1 ?
    <nav>
      <StyledBreadcrumbs>
        { items.map(({ title, to }, index) => <Link key={ index } to={ to }>{ title }</Link>) }
      </StyledBreadcrumbs>
    </nav> :
    null
  )
}

export default BreadCrumbs

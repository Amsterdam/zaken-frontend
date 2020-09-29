import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Heading, Icon, themeSpacing, themeColor, ascDefaultTheme } from "@datapunt/asc-ui"
import * as Assets from "@datapunt/asc-assets"
import { ChevronRight } from "@datapunt/asc-assets"
import to from "app/features/shared/routing/to"
import find from "app/features/shared/routing/find"
import routes from "app/config/routes"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
  li {
    display: inline;
    a {
      color: ${ themeColor("tint", "level4") };
      text-decoration: none;
    }
  }
`
const StyledIcon = styled(Icon)`
  display: inline;
  margin-right: 8px;
`
const StyledSeperator = styled(Icon)`
  display: inline;
  margin: 0 ${ themeSpacing(2) };
  svg {
    vertical-align: middle;
  }
`

const BreadCrumbs: React.FC<Props> = ({ bagId }) => {
  const route = find(routes, window.location.pathname)

  const pageConfig = route ? routes[route] : undefined
  const items = pageConfig?.path?.map(item => ({ ...item, to: to(item.path, { bagId }) })) ?? []

  // TODO: Remove `({ theme: ascDefaultTheme })` after fix https://github.com/Amsterdam/amsterdam-styled-components/issues/1108
  return (
    <Heading forwardedAs="h3">
      <Ul>
        { items.map(({ title, icon, to }, index) => {
            const isLast = items.length - 1 === index
            const Asset = icon ? Assets[icon] : null
            return (
              <li key={ index }>
                <Link to={ to }>
                  { Asset &&
                    <StyledIcon color={ themeColor("tint", "level4")({ theme: ascDefaultTheme }) }><Asset /></StyledIcon>
                  }
                  { title ?? "" }
                </Link>
                { !isLast &&
                  <StyledSeperator color={ themeColor("tint", "level4")({ theme: ascDefaultTheme }) }>
                    <ChevronRight />
                  </StyledSeperator>
                }
              </li>
            )
          })
        }
      </Ul>
    </Heading>
  )
}
export default BreadCrumbs

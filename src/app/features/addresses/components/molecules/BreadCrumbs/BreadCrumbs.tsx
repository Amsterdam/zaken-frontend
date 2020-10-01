import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Icon, themeSpacing, themeColor, ascDefaultTheme } from "@datapunt/asc-ui"
import { ChevronRight } from "@datapunt/asc-assets"
import to from "app/features/shared/routing/to"
import find from "app/features/shared/routing/find"
import routes from "app/config/routes"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const LEVEL = "level5"
const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
  line-height: 1.6em;
  li {
    display: inline;
    font-size: 14px;
    a, span {
      color: ${ themeColor("tint", LEVEL) };
    }
    a {
      text-decoration: none;
      &:hover {
        color: ${ themeColor("secondary") };
        text-decoration: underline;
      }
    }
  }
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
    <nav>
      <Ul>
        { items.map(({ title, to }, index) => {
            const isLast = items.length - 1 === index
            return (
              <li key={ index }>
                { !isLast ?
                  <Link to={ to }>
                    { title ?? "" }
                  </Link> :
                  <span>{ title ?? "" }</span>
                }
                { !isLast &&
                  <StyledSeperator size={ 9 } color={ themeColor("tint", LEVEL)({ theme: ascDefaultTheme }) }>
                    <ChevronRight />
                  </StyledSeperator>
                }
              </li>
            )
          })
        }
      </Ul>
    </nav>
  )
}
export default BreadCrumbs

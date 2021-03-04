import React from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Icon, themeSpacing, themeColor, ascDefaultTheme, breakpoint } from "@amsterdam/asc-ui"
import { ChevronRight } from "app/components/shared/Icons"
import to from "app/routing/utils/to"
import find from "app/routing/utils/find"
import routes from "app/routing/routes"

type Props = {
  routeParams?: Record<string, unknown>
}

const LEVEL = "level5"
const Ul = styled.ul`
  margin: 0;
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
  @media screen and ${ breakpoint("min-width", "tabletM") } {
    margin-left: -6px;
  }
`
const StyledSeperator = styled(Icon)`
  display: inline;
  margin: 0 ${ themeSpacing(1) };
  svg {
    vertical-align: text-bottom;
  }
`

const BreadCrumbs: React.FC<Props> = ({ routeParams }) => {
  const route = find(routes, window.location.pathname)

  const pageConfig = route ? routes[route] : undefined
  const items = pageConfig?.path?.map(item => ({ ...item, to: to(item.path, routeParams) })) ?? []

  // TODO: Use BreadCrumbs component provided by ASC https://amsterdam.github.io/amsterdam-styled-components/?path=/story/ui-breadcrumbs--default-story
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
                  <StyledSeperator size={ 18 } color={ themeColor("tint", LEVEL)({ theme: ascDefaultTheme }) }>
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

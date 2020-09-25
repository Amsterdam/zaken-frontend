import React, { useMemo } from "react"
import styled from "styled-components"
import { Link } from "@reach/router"
import { Heading, Icon, themeSpacing, themeColor, ascDefaultTheme } from "@datapunt/asc-ui"
import { ChevronRight } from "@datapunt/asc-assets"
import to from "app/features/shared/routing/to"
import slashSandwich from "slash-sandwich"


type BagId = Components.Schemas.Address["bag_id"]
type Props = {
  bagId: BagId
  subPageTitle?: string
  subPage?: string
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
  margin: 0 ${ themeSpacing(2) };
  svg {
    vertical-align: middle;
  }
`

const createItems = (bagId: BagId, subPageTitle?: string, subPage?: string) => {
  const items = [
    { title: "Home", to: "/" },
    { title: "Adres overzicht", to: to("/adres/:bagId", { bagId }) }
  ]
  if (subPage && subPageTitle) items.push({ title: subPageTitle, to: to(slashSandwich(["/adres/:bagId", subPage]), { bagId }) })
  return items
}


const BreadCrumbs: React.FC<Props> = ({ bagId, subPageTitle, subPage }) => {
  const items = useMemo(() => createItems(bagId, subPageTitle, subPage), [bagId, subPageTitle, subPage])

  return (
    <Heading forwardedAs="h3">
      <Ul>
        { items.map(({ title, to }, index) => {
            const isLast = items.length - 1 === index
            return (
              <li key={ index }>
                <Link to={ to }>{ title }</Link>
                { !isLast &&
                  // TODO: Remove `({ theme: ascDefaultTheme })` after fix https://github.com/Amsterdam/amsterdam-styled-components/issues/1108
                  <StyledIcon color={ themeColor("tint", "level4")({ theme: ascDefaultTheme }) }>
                    <ChevronRight />
                  </StyledIcon>
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

import { Link, List, ListItem, themeColor } from "@amsterdam/asc-ui"
import styled from "styled-components"

type Props = {
  linkList: {
    title: string
    target: string
  }[]
}

const StyledList = styled(List)`
  margin: 0;
  li {
    margin: 0;
  }
`

const StyledLink = styled(Link)`

    background-color: ${ themeColor("primary") };
    color: ${ themeColor("tint", "level1") };
    left: 50%;
    padding: 12px 16px;
    position: absolute;
    transform: translate(-50%, -100%);
    transition: transform 0.3s ease 0s;
    z-index: -999;

    &:hover {
      color: ${ themeColor("tint", "level1") };
      text-decoration: none;
    }
    &:focus {
      transform: translate(-50%, 0%);
      z-index: 999;
    }
`

const SkipLinks: React.FC<Props> = ( { linkList }) => (
  <nav>
    <StyledList >
      {linkList.map((link, index) =>
        <ListItem key={ `${ link.target }_${ index }` }>
          <StyledLink href={ `#${ link.target }` }>{ link.title }</StyledLink>
        </ListItem>
      )}
    </StyledList>
  </nav>
)

export default SkipLinks
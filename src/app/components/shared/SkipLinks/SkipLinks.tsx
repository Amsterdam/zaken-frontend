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
    color: rgb(255, 255, 255);
    left: 50%;
    padding: 12px 16px;
    position: absolute;
    transform: translate(-50%, -100%);
    transition: transform 0.3s ease 0s;
    z-index: -999;

    &:focus {
      transform: translate(-50%, 0%);
      z-index: 999;
    }
`

const SkipLinks: React.FC<Props> = ( { linkList }) => (
  <nav>
    <StyledList >
      {linkList.map((link) => 
        <ListItem>
          <StyledLink href={ `#${ link.target }` }>{ link.title }</StyledLink>
        </ListItem>
      )}
    </StyledList>
  </nav>
)

export default SkipLinks
import styled from "styled-components"
import { themeSpacing, breakpoint } from "@amsterdam/asc-ui"

const Div = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;

  ul {
    margin: 0 -${ themeSpacing(1.5) };
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  li {
    display: inline-block;
    width: 100%;
    margin-bottom: ${ themeSpacing(3) };
    @media screen and ${ breakpoint("min-width", "tabletS") } {
      width: 50%;
    }
    @media screen and ${ breakpoint("min-width", "laptopM") } {
      width: 25%;
    }
  }

  li > div {
    margin: 0 ${ themeSpacing(1.5) };
  }
`

const BlockMenu: React.FC = ({ children }) => <Div>{ children }</Div>
export default BlockMenu
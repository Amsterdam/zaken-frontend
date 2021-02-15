import styled from "styled-components"
import { themeColor, themeSpacing, breakpoint } from "@amsterdam/asc-ui"

// STYLING
export default styled.dl`
  max-width: 800px;

  &:after {
    clear: both;
    content: "";
    display: table;
  }

  dd, dt {
    width: 50%;
    padding: ${ themeSpacing(1) } 0;
  }
  dt {
    float: left;
    clear: both;
    word-wrap: break-word;
    padding-right: ${ themeSpacing(5) };
    color: ${ themeColor("tint","level5") };
    @media ${ breakpoint("min-width", "tabletM") } {
      width: 30%;
    }
  }
  dd {
    margin: 0;
    padding-right: 20px;
    float: right;
    clear: right;
    @media ${ breakpoint("min-width", "tabletM") } {
      width: 70%;
    }
  }
`

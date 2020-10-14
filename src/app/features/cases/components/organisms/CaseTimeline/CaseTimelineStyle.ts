import styled from "styled-components"
import { Accordion, themeSpacing, themeColor, breakpoint } from "@datapunt/asc-ui"

const StyledAccordion = styled(Accordion)`
  padding-left: ${ themeSpacing(10) };
  background-color: transparent;
  position: relative;
  > span {
      font-weight: 500;
  }

  &:before {
    content: "";
    width: ${ themeSpacing(6) };
    height: ${ themeSpacing(6) };
    border-radius: 50%;
    position: absolute;
    left: ${ themeSpacing(2) };
    top: ${ themeSpacing(3) };
    background-color: ${ themeColor("tint", "level4") };
  }

  + div {
    border: 0;
    padding-top: 0;
    padding-left: ${ themeSpacing(10) };
     > button {
       padding-right: 0;
       padding-left: 0;
       border: 0;

       &:before {
        width: ${ themeSpacing(4) };
        height: ${ themeSpacing(4) };
        left: -${ themeSpacing(7) };
        top: ${ themeSpacing(3) };
      }
      + div {
        padding-right: 0;
        padding-left: 0;
      }
     }
  }
  &:hover,
  &:focus {
    background-color: transparent !important;
  }

  * {
    padding: 0;
    border: 0
  }

  @media screen and ${ breakpoint("min-width", "laptop") } {
    padding-left: ${ themeSpacing(20) };
    &:before {
      left: ${ themeSpacing(8) };
    }
  
    + div {
      padding-left: ${ themeSpacing(20) };
      border: 0;
       > button {
        &:before {
          left: -${ themeSpacing(11) };
        }
       }
    }
  }
`
const Dl = styled.dl`
max-width: 500px;

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
  color: ${ themeColor("tint","level6") }
}
dd {
  margin: 0;
  padding-right: 20px;
  float: right;
  clear: right;
}
`

export { StyledAccordion, Dl }
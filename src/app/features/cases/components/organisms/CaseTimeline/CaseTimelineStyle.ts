import styled from "styled-components"
import { themeSpacing, themeColor, breakpoint } from "@datapunt/asc-ui"
import { Timeline } from "app/features/shared/components/molecules/Timeline"

const StyledTimeline = styled(Timeline)`

  // + div {
  //   border: 0;
  //   padding-top: 0;
  //   padding-left: ${ themeSpacing(10) };
  //    }
  // }
  // &:hover,
  // &:focus {
  //   background-color: transparent !important;
  // }

  // * {
  //   padding: 0;
  //   border: 0
  // }

  // @media screen and ${ breakpoint("min-width", "laptop") } {
  //   padding-left: ${ themeSpacing(20) };
  //   &:before {
  //     left: ${ themeSpacing(7.5) };
  //   }
  
  //   + div {
  //     padding-left: ${ themeSpacing(20) };
  //     border: 0;
  //      > button {
  //       &:before {
  //         left: -${ themeSpacing(11.5) };
  //       }
  //      }
  //   }
  // }
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

export { StyledTimeline, Dl }
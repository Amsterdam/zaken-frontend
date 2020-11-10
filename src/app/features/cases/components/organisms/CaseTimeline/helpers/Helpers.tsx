import styled from "styled-components"
import {  themeColor, themeSpacing, breakpoint } from "@datapunt/asc-ui"


export type DLProps = {
  thread: Components.Schemas.CaseEvent
  showDate: boolean
}
  

// FUNCTIONS
export const mapCaseType = (type: Components.Schemas.TypeEnum) => {
    switch (type) {
      case "DEBRIEFING": return "Debrief"
      case "VISIT": return "Huisbezoek(en)"
      case "CASE": return "Aanleiding"
    }
  }

// STYLING
export const Dl = styled.dl`
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
    color: ${ themeColor("tint","level6") };
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
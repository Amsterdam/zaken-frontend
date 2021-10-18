import styled from "styled-components"
import { Link } from "@reach/router"
import { themeColor } from "@amsterdam/asc-ui"

// Filter all non-standard props like flex.
export default styled(({ flex, ...props }) => <Link {...props} />)`
  display: ${ ({ flex }) => flex ? "flex" : "inline-block" };
  align-items: center;
  text-decoration: none;
  color: ${ themeColor("tint", "level7") };
  height: 100%;
`

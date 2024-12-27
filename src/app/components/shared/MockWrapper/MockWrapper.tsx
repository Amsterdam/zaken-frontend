import styled from "styled-components"
import { themeColor, ascDefaultTheme } from "@amsterdam/asc-ui"
import { env } from "app/config/env"

type Props = {
  hasPadding?: boolean
  children: React.ReactNode
}

type DivProps = {
  hasPadding: boolean
  isProduction: boolean
}

// TODO: Remove theme call. Currently needed cause of a bug in ASC.
const Div = styled.div<DivProps>`
  border: ${ ({ isProduction }) => isProduction ? "none" : `solid 2px ${ themeColor("supplement", "pink")({ theme: ascDefaultTheme }) }` };
  padding: ${ ({ isProduction, hasPadding }) => !isProduction && hasPadding ? "4px" : 0 };
  display: ${ ({ isProduction }) => isProduction ? "none" : "block" };
`

const MockWrapper: React.FC<Props> = ({ hasPadding = true, children }) => (
  <Div isProduction={ env.VITE_ENVIRONMENT === "production" } hasPadding={ hasPadding }>
    { children }
  </Div>
)
export default MockWrapper

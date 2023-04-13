import styled from "styled-components"
import { Spinner } from "@amsterdam/asc-ui"

type Props = {
  spinning?: boolean
}

const SpinnerContainer = styled.div`
  background: rgba(0,0,0,0.1);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
`

const SpinnerWrapper: React.FC<Props> = ({ spinning = true, children }) => (
  <div>
    { spinning && (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )}
    { children }
  </div>
)

export default SpinnerWrapper

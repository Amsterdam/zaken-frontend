import styled, { keyframes } from "styled-components"

export const FullScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const spin = keyframes`
  100% {
    transform: rotate(1turn);
  }
`

export const BasicSpinner = styled.div<{ color?: string, size?: number }>`
  width: ${ ({ size }) => size ?? 50 }px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(
        farthest-side,
        ${ ({ color }) => color ?? "#ffa516" } 94%,
        #0000
      )
      top/8px 8px no-repeat,
    conic-gradient(#0000 30%, ${ ({ color }) => color ?? "#ffa516" });
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: ${ spin } 1s infinite linear;
`

export const LoadingScreenBasic: React.FC<{
  color?: string
  size?: number
}> = ({ color = "#ec0000", size = 60 }) => (
  <FullScreenWrapper>
    <BasicSpinner color={ color } size={ size } />
  </FullScreenWrapper>
)

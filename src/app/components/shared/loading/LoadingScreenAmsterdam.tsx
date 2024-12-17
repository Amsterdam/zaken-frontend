import React from "react"
import styled, { keyframes } from "styled-components"

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`

const spin = keyframes`
  100% {
    transform: rotate(calc(var(--s, 1) * 1turn));
  }
`

const Cross = styled.div<{ duration: number, delay: number }>`
  width: 100px;
  aspect-ratio: 1;
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  background: #fff;
  filter: blur(4px) contrast(10);
  mix-blend-mode: darken;

  &::before,
  &::after {
    content: "";
    grid-area: 1 / 1;
    margin: 30px 0;
    border-radius: 100px;
    background: #ec0000;
    animation: ${ spin } ${ ({ duration }) => duration }s infinite linear;
    animation-delay: ${ ({ delay }) => delay }s;
  }

  &::after {
    --s: -1;
  }
`

export const LoadingScreenAmsterdam: React.FC = () => (
  <CenterWrapper>
    <Cross duration={3} delay={0} />
    <Cross duration={3} delay={0} />
    <Cross duration={3} delay={0} />
  </CenterWrapper>
)

export default LoadingScreenAmsterdam

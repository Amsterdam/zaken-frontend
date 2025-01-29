
import styled from "styled-components"
import { Spinner } from "@amsterdam/asc-ui"
import DefaultLayout from "app/components/layouts/DefaultLayout/DefaultLayout"

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`

export const LoadingScreen: React.FC = () => (
  <DefaultLayout>
    <Wrap>
      <Spinner size={ 36 } />
    </Wrap>
  </DefaultLayout>
)

export default LoadingScreen

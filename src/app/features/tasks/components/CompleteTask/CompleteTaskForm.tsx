import React from "react"
import { darken } from "polished"

import { themeColor, ascDefaultTheme } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import createScaffoldProps from "./scaffold"
import styled from "styled-components"

type Props = {
  onSubmit: any
  isLoading?: boolean
}

const Div = styled.div`
  button {
    background-color: ${ themeColor("primary") };
    &:hover,
    &:focus {
      background-color: ${ darken(0.1, themeColor("primary")({ theme: ascDefaultTheme })) };
    }
  }
`

const CompleteTaskForm: React.FC<Props> = ({ isLoading, onSubmit }) => 
<Div>
  <ScaffoldForm
    showSpinner={ isLoading }
    onSubmit={ onSubmit }
  >
    <ScaffoldFields {...createScaffoldProps() } />
  </ScaffoldForm>
  </Div>
export default CompleteTaskForm

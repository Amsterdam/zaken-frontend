import React from "react"
import styled from "styled-components"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"

import createScaffoldProps from "./scaffold"

type Props = {
  caseId: Components.Schemas.Case["id"]
  initialValues?: Partial<Components.Schemas.Debriefing>
  onSubmit: (data: Components.Schemas.Debriefing) => Promise<void>
  isLoading?: boolean
}

const FormWithTooltip = styled.div`
  form > div > div > div > div {
    flex-grow: 0;
    align-self: center;
    white-space: nowrap;
  }
`

const DebriefForm: React.FC<Props> = ({ caseId, initialValues, isLoading, onSubmit }) => 
    <FormWithTooltip>
      <ScaffoldForm
        showSpinner={ isLoading }
        onSubmit={ onSubmit }
        initialValues={ initialValues ?? { case: caseId } }
      >
        <ScaffoldFields {...createScaffoldProps(caseId, initialValues !== undefined) } />
      </ScaffoldForm>  
    </FormWithTooltip>


export default DebriefForm

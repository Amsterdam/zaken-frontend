import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { Spinner } from "@amsterdam/asc-ui"
import ConfirmScaffoldFields from "app/features/shared/components/molecules/ConfirmScaffoldFields/ConfirmScaffoldFields"
import useSubmitConfirmation from "app/features/shared/components/molecules/ConfirmScaffoldFields/hooks/useSubmitConfirmation"

type Props = {
  caseId: Components.Schemas.Case["id"]
  endpoint: any
  scaffold: any
  extraLabel?: string
}

const WorkflowForm: React.FC<Props> = ({ caseId, scaffold, endpoint, extraLabel }) => {

  const result = endpoint()

  //TODO allow for PUT
  const { execPost } = endpoint()
  
  const {
    isSubmitted,
    data: confirmData,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation<MockComponents.Schemas.CaseRequestBody>(execPost)


  if (result.data === undefined) return <Spinner />

  const fields = scaffold( caseId, result.data, extraLabel )
  const submitTitle = fields.fields.submit.props.label

  return (
    <ScaffoldForm onSubmit={ onSubmit }>
      <ScaffoldFields {...fields } />
      { isSubmitted &&
        <ConfirmScaffoldFields
          fields={ fields.fields }
          data={ confirmData }
          onCancel= { onCancelConfirm }
          onSubmit={ onSubmitConfirm }
          submitTitle= { submitTitle ?? "Resultaat verwerken" }
          showInModal={ true }
        />
      }
    </ScaffoldForm>  
  )
}

export default WorkflowForm

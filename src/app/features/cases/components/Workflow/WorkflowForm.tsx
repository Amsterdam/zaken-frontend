import React from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { Spinner } from "@amsterdam/asc-ui"
import ConfirmScaffoldFields from "app/features/shared/components/molecules/ConfirmScaffoldFields/ConfirmScaffoldFields"
import useSubmitConfirmation from "app/features/shared/components/molecules/ConfirmScaffoldFields/hooks/useSubmitConfirmation"

type Props = {
  caseId: Components.Schemas.Case["id"]
  data?: Record<string, any>
  postMethod: (data: any) => Promise<unknown>
  scaffold: (caseId: Components.Schemas.Case["id"], data: any, extraLabel?: string) => { fields: Fields }
  extraLabel?: string
}

const WorkflowForm: React.FC<Props> = ({ caseId, scaffold, data, postMethod, extraLabel }) => {

  const {
    isSubmitted,
    data: confirmData,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation<MockComponents.Schemas.CaseRequestBody>(postMethod)

  if (data === undefined) return <Spinner />

  const fields = scaffold(caseId, data, extraLabel)
  const submitTitle = fields.fields.submit.props.label

  return (
    <ScaffoldForm onSubmit={ onSubmit }>
      <ScaffoldFields {...fields } />
      { isSubmitted &&
        <ConfirmScaffoldFields<typeof data>
          fields={ fields.fields }
          data={ confirmData }
          showFields={ Object.keys(fields.fields) }
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

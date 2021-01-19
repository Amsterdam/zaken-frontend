import React, { useState } from "react"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { Spinner } from "@amsterdam/asc-ui"
import ConfirmScaffoldFields from "app/features/shared/components/molecules/ConfirmScaffoldFields/ConfirmScaffoldFields"

type Props = {
  caseId: Components.Schemas.Case["id"]
  endpoint: any
  scaffold: any
  extraLabel?: string
}

const WorkflowForm: React.FC<Props> = ({ caseId, scaffold, endpoint, extraLabel }) => {

  const result = endpoint()
  const [isSubmitted, setSubmitted] = useState(false)
  const [data, setData] = useState<MockComponents.Schemas.CaseRequestBody>()

  //TODO allow for PUT
  const { execPost } = endpoint()

  if (result.data === undefined) return <Spinner />

  const fields = scaffold( caseId, result.data, extraLabel )
  const submitTitle = fields.fields.submit.props.label

  const onSubmit = async (data: any) => {
    setSubmitted(true)
    setData(data)
  }

  const onSubmitConfirm = async () => {
    await execPost(data)
    setSubmitted(false)
  }

  return (
    <ScaffoldForm onSubmit={ onSubmit }>
      <ScaffoldFields {...fields } />
      { isSubmitted &&
        <ConfirmScaffoldFields
          fields={ fields.fields }
          data={ data }
          onCancel={ () => setSubmitted(false) }
          submitTitle= { submitTitle ?? "Resultaat verwerken" }
          onSubmit={ onSubmitConfirm }
          showInModal={ true }
        />
      }
    </ScaffoldForm>  
  )
}

export default WorkflowForm

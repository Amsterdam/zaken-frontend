import React from "react"
import { Spinner } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import { useCompleteCase } from "app/state/rest"
import useSubmitConfirmation from "app/features/shared/components/molecules/ConfirmScaffoldFields/hooks/useSubmitConfirmation"
import scaffold from "./scaffold"
import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import ConfirmScaffoldFields from "app/features/shared/components/molecules/ConfirmScaffoldFields/ConfirmScaffoldFields"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const CompleteCaseForm: React.FC<Props> = ({ caseId }) => {

  const { data } = useCompleteCase(caseId)
  const execPut = async () => {}
  const {
    isSubmitted,
    data: confirmData,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation<{ complete: string, text: string }>(execPut)

  if (data === undefined ) return <Spinner />

  const fields = scaffold(caseId, data)

  return (
    <ScaffoldForm onSubmit={ onSubmit }>
      <ScaffoldFields { ...fields } />
      { isSubmitted &&
        <ConfirmScaffoldFields
          fields={ fields.fields }
          data={ confirmData }
          onCancel={ onCancelConfirm }
          submitTitle="Zaak afronden"
          onSubmit={ onSubmitConfirm }
          showInModal={ true }
        />
      }
    </ScaffoldForm>
  )
}
export default CompleteCaseForm
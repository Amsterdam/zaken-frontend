import React from "react"
import { Spinner } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useTeams, useReasons, useCase } from "app/state/rest"
import ConfirmScaffoldFields from "app/features/shared/components/molecules/ConfirmScaffoldFields/ConfirmScaffoldFields"
import useSubmitConfirmation from "app/features/shared/components/molecules/ConfirmScaffoldFields/hooks/useSubmitConfirmation"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const CreateForm: React.FC<Props> = ({ bagId }) => {

  const teams = useTeams()
  const reasons = useReasons()
  const { execPost } = useCase()
  const {
    isSubmitted,
    data: confirmData,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation<MockComponents.Schemas.CaseRequestBody>(execPost)

  if (teams.data === undefined || reasons.data === undefined) return <Spinner />

  const fields = scaffold(bagId, teams.data, reasons.data)

  return (
    <ScaffoldForm onSubmit={ onSubmit }>
      <ScaffoldFields { ...fields } />
      { isSubmitted &&
        <ConfirmScaffoldFields
          fields={ fields.fields }
          data={ confirmData }
          onCancel={ onCancelConfirm }
          submitTitle="Zaak aanmaken"
          onSubmit={ onSubmitConfirm }
          showInModal={ true }
        />
      }
    </ScaffoldForm>
  )
}
export default CreateForm
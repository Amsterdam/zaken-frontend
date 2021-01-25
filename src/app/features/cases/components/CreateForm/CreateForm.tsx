import React from "react"
import { Spinner } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useTeams, useReasons, useCaseCreateUpdate } from "app/state/rest"
import ConfirmScaffoldFields from "app/features/shared/components/molecules/ConfirmScaffoldFields/ConfirmScaffoldFields"
import useSubmitConfirmation from "app/features/shared/components/molecules/ConfirmScaffoldFields/hooks/useSubmitConfirmation"
import { navigate } from "@reach/router"
import to from "app/features/shared/routing/to"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const mapData = (data: any) => ({
  address: data.address,
  description: data.description,
  team: parseInt(data.team.replace("team.", ""), 10),
  reason: parseInt(data.reason.replace("reason.", ""), 10)
})

const CreateForm: React.FC<Props> = ({ bagId }) => {

  const teams = useTeams()
  // TODO: Switch per team
  const reasons = useReasons(1)
  const { execPost } = useCaseCreateUpdate()
  const {
    isSubmitted,
    data: confirmData,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation<Components.Schemas.CaseCreateUpdate>(execPost, mapData)

  if (teams.data === undefined || reasons.data === undefined) return <Spinner />

  const fields = scaffold(bagId, teams.data.results ?? [], reasons.data.results ?? [])

  const onSubmitConfirmWrap = async () => {
    await onSubmitConfirm()
    // TODO-MOCKED: remove hardcoded id
    navigate(to("/cases/1200"))
  }

  return (
    <ScaffoldForm onSubmit={ onSubmit } initialValues={ { address: { bag_id: bagId } } }>
      <ScaffoldFields { ...fields } />
      { isSubmitted &&
        <ConfirmScaffoldFields<MockComponents.Schemas.CaseRequestBody>
          fields={ fields.fields }
          data={ confirmData }
          onCancel={ onCancelConfirm }
          submitTitle="Zaak aanmaken"
          onSubmit={ onSubmitConfirmWrap }
          showInModal={ true }
        />
      }
    </ScaffoldForm>
  )
}
export default CreateForm
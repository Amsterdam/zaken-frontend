import React, { useState } from "react"
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

type FormData =
  Pick<Components.Schemas.CaseCreateUpdate, "address" | "description"> &
  { team: string, reason: string }

const mapData = (data: FormData): Components.Schemas.CaseCreateUpdate => ({
  address: data.address,
  description: data.description,
  team: parseInt(data.team.replace("team.", ""), 10),
  reason: parseInt(data.reason.replace("reason.", ""), 10)
})

const CreateForm: React.FC<Props> = ({ bagId }) => {

  const teams = useTeams()
  const [selectedTeam, selectTeam] = useState<number>()
  const onChangeTeams = (value: string) => selectTeam(parseInt(value.replace("team.", ""), 10))
  const reasons = useReasons(selectedTeam)
  const { execPost } = useCaseCreateUpdate()
  const postMethod = async (data: FormData) => {
    await execPost(mapData(data))
  }
  const {
    isSubmitted,
    data: confirmData,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation<FormData>(postMethod)

  if (teams.data === undefined) return <Spinner />

  const fields = scaffold(bagId, teams.data.results ?? [], onChangeTeams, reasons.data?.results ?? [])

  const onSubmitConfirmWrap = async () => {
    await onSubmitConfirm()
    // TODO-MOCKED: Redirect to `cases/:id`
    navigate(to("/cases"))
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
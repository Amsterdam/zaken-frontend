import React, { useMemo } from "react"
import { Spinner } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/features/shared/components/molecules/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useTeams, useReasons, useCaseCreateUpdate } from "app/state/rest"
import ConfirmScaffoldFields from "app/features/shared/components/molecules/ConfirmScaffoldFields/ConfirmScaffoldFields"
import useSubmitConfirmation from "app/features/shared/components/molecules/ConfirmScaffoldFields/hooks/useSubmitConfirmation"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import navigateTo from "app/features/shared/routing/navigateTo"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

type FormData =
  Pick<Components.Schemas.CaseCreateUpdate, "address" | "description"> &
  { team: string, reason: string }

const parseRadioButtonValue = (key: string) => (value: string) => parseInt(value.replace(`${ key }.`, ""), 10)
const mapData = (bagId: Components.Schemas.Address["bag_id"], data: FormData): Omit<Components.Schemas.CaseCreateUpdate, "id"> => ({
  address: { bag_id: bagId } as Components.Schemas.Address,
  description: data.description,
  team: parseRadioButtonValue("team")(data.team),
  reason: parseRadioButtonValue("reason")(data.reason)
})

const CreateForm: React.FC<Props> = ({ bagId }) => {

  const teams = useTeams()
  const reasons = useReasons(teams.data?.results?.[0].id)
  const { execPost } = useCaseCreateUpdate()
  const postMethod = async (data: FormData) => await execPost(mapData(bagId, data))
  const {
    isSubmitted,
    data: confirmData,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation<FormData>(postMethod)
  const { addSuccessFlashMessage } = useFlashMessages()

  const fields = useMemo(() => scaffold(bagId, teams.data?.results ?? [], reasons.data?.results ?? []), [bagId, teams.data, reasons.data])

  if (teams.data === undefined || reasons.data === undefined) return <Spinner />

  const onSubmitConfirmWrap = async () => {
    const result = await onSubmitConfirm()
    if (result === undefined) return
    const caseData = (result as { data: Components.Schemas.CaseCreateUpdate }).data
    const path = `/zaken/${ caseData.id }`
    addSuccessFlashMessage(path, "Succes", "De zaak is succesvol toegevoegd")
    navigateTo(path)
  }

  return (
    <ScaffoldForm onSubmit={ onSubmit }>
      <ScaffoldFields { ...fields } />
      { isSubmitted &&
        <ConfirmScaffoldFields<FormData>
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
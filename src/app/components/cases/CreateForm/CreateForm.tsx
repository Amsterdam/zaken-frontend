import { FC, useMemo } from "react"
import { Spinner } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffold from "./scaffold"
import { useTeams, useReasons, useCaseCreateUpdate } from "app/state/rest"
import ConfirmScaffoldFields from "app/components/shared/ConfirmScaffoldFields/ConfirmScaffoldFields"
import useSubmitConfirmation from "app/components/shared/ConfirmScaffoldFields/hooks/useSubmitConfirmation"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import navigateTo from "app/routing/navigateTo"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

type FormData =
  Pick<Components.Schemas.CaseCreateUpdate, "address" | "description"> &
  { team: Components.Schemas.CaseTeam, reason: Components.Schemas.CaseReason }

const mapData = (bagId: Components.Schemas.Address["bag_id"], data: FormData): Omit<Components.Schemas.CaseCreateUpdate, "id"> => ({
  address: { bag_id: bagId } as Components.Schemas.Address,
  description: data.description,
  team: data.team.id,
  reason: data.reason.id
})

const CreateForm: FC<Props> = ({ bagId }) => {

  const [teams] = useTeams()
  const [reasons] = useReasons(teams?.results?.[0].id)
  const [, { execPost }] = useCaseCreateUpdate()
  const postMethod = async (data: FormData) => await execPost(mapData(bagId, data))

  const {
    isSubmitted,
    data: confirmData,
    onSubmit,
    onSubmitConfirm,
    onCancelConfirm
  } = useSubmitConfirmation<FormData>(postMethod)
  const { addSuccessFlashMessage } = useFlashMessages()

  const fields = useMemo(() => scaffold(bagId, teams?.results ?? [], reasons?.results ?? []), [bagId, teams, reasons])

  if (teams === undefined || reasons === undefined) return <Spinner />

  const onSubmitConfirmWrap = async () => {
    const result = await onSubmitConfirm()
    if (result === undefined) return
    const { data: { id } } = result as { data: Components.Schemas.CaseCreateUpdate }
    addSuccessFlashMessage(`/zaken/${ id }`, "Succes", "De zaak is succesvol toegevoegd")
    navigateTo("/zaken/:id", { id })
  }

  return (
    <ScaffoldForm onSubmit={ onSubmit } initialValues={ { team: teams?.results?.[0], reason: reasons?.results?.[0] } }>
      <ScaffoldFields { ...fields } />
      { isSubmitted &&
        <ConfirmScaffoldFields<FormData>
          fields={ fields.fields as any }
          data={ confirmData }
          showFields={ Object.keys(fields.fields) }
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
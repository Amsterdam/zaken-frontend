import { FC, useMemo } from "react"
import { Spinner } from "@amsterdam/asc-ui"

import scaffold from "./scaffold"
import { useTeams, useReasons, useCaseCreateUpdate } from "app/state/rest"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"

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
  const postMethod = async (data: FormData) =>
    await execPost(mapData(bagId, data)) as Components.Schemas.CaseCreateUpdate

  const fields = useMemo(
    () => teams !== undefined && reasons !== undefined ? scaffold(bagId, teams.results ?? [], reasons.results ?? []) : undefined,
    [bagId, teams, reasons]
  )

  const navigateWithFlashMessage = useNavigateWithFlashMessage()
  const afterSubmit = async (result: Components.Schemas.CaseCreateUpdate) => await navigateWithFlashMessage(
    "/zaken/:id",
    { id: result.id },
    "info",
    "Succes",
    "De zaak is succesvol toegevoegd"
  )

  const initialValues = { team: teams?.results?.[0], reason: reasons?.results?.[0] }

  if (fields === undefined) return <Spinner />

  return (
    <ConfirmScaffoldForm
      fields={ fields }
      postMethod={ postMethod }
      afterSubmit={ afterSubmit }
      initialValues={ initialValues }
    />
  )
}

export default CreateForm
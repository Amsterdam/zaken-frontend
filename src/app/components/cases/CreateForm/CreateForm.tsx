import { useState, useEffect } from "react"
import scaffold from "./scaffold"
import { useCaseThemes, useReasons, useCaseCreate, useProjects } from "app/state/rest"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

type FormData =
  Pick<CaseCreate, "address" | "description"> &
  { theme: Components.Schemas.CaseTheme, reason: Components.Schemas.CaseReason, project: MockComponents.Schemas.CaseProject }

const mapData = (bagId: Components.Schemas.Address["bag_id"]) =>
  (data: FormData): CaseCreate => ({
    ...data,
    address: { bag_id: bagId },
    theme: data.theme.id,
    reason: data.reason.id,
    project: data.project.id
  })

const CreateForm: React.FC<Props> = ({ bagId }) => {

  const [caseThemes] = useCaseThemes()
  const [themeId, setThemeId] = useState<Components.Schemas.CaseTheme["id"]>()
  useEffect(() => setThemeId(caseThemes?.results?.[0].id), [caseThemes, setThemeId])
  const [reasons] = useReasons(themeId)
  const [projects] = useProjects(themeId)
  const [, { execPost }] = useCaseCreate()

  const fields = useScaffoldedFields(scaffold, bagId, setThemeId, caseThemes?.results, reasons?.results, projects?.results)

  const navigateWithFlashMessage = useNavigateWithFlashMessage()
  const afterSubmit = async (result: Components.Schemas.CaseCreateUpdate) =>
    await navigateWithFlashMessage(
      "/zaken/:id",
      { id: result.id },
      "info",
      "Succes",
      "De zaak is succesvol toegevoegd"
    )

  const initialValues = {
    theme: caseThemes?.results?.find(({ id }) => id === themeId),
    reason: reasons?.results?.[0]
  }

  return (
    <ConfirmScaffoldForm
      fields={ fields }
      postMethod={ execPost }
      mapData={ mapData(bagId) }
      afterSubmit={ afterSubmit }
      initialValues={ initialValues }
      submittingTitle="De zaak wordt aangemaakt. Wacht met sluiten van dit venster."
    />
  )
}

export default CreateForm

import scaffold from "./scaffold"
import { useCaseThemes, useReasons, useCaseCreate } from "app/state/rest"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

type FormData =
  Pick<CaseCreate, "address" | "description"> &
  { theme: Components.Schemas.CaseTheme, reason: Components.Schemas.CaseReason }

const mapData = (bagId: Components.Schemas.Address["bag_id"]) =>
  (data: FormData): CaseCreate => ({
    ...data,
    address: { bag_id: bagId },
    theme: data.theme.id,
    reason: data.reason.id
  })

const CreateForm: React.FC<Props> = ({ bagId }) => {

  const [caseThemes] = useCaseThemes()
  const [reasons] = useReasons(caseThemes?.results?.[0].id)
  const [, { execPost }] = useCaseCreate()

  const fields = useScaffoldedFields(scaffold, bagId, caseThemes?.results, reasons?.results)

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
    theme: caseThemes?.results?.[0],
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

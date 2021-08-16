import { useState, useEffect } from "react"
import scaffold from "./scaffold"
import { useCaseThemes, useReasons, useCaseCreate, useProjects, useListings } from "app/state/rest"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  tonId: number | undefined
}

type FormData =
  Pick<CaseCreate, "address" | "description"> &
  { theme: Components.Schemas.CaseTheme, reason: Components.Schemas.CaseReason, project: Components.Schemas.CaseProject }

const mapData = (bagId: Components.Schemas.Address["bag_id"]) =>
  (data: FormData): CaseCreate => ({
    ...data,
    address: { bag_id: bagId },
    theme: data.theme.id,
    reason: data.reason.id,
    project: data.project?.id
  })

const CreateForm: React.FC<Props> = ({ bagId, tonId }) => {
  const [caseThemes] = useCaseThemes()
  const [themeId, setThemeId] = useState<Components.Schemas.CaseTheme["id"]>()

  useEffect(() => {
    const caseThemeId = tonId
      ? caseThemes?.results?.find(({ name }) => name === "Vakantieverhuur")?.id
      : caseThemes?.results?.[0].id
    setThemeId(caseThemeId)
  }, [tonId, caseThemes, setThemeId])

  const [reasons] = useReasons(themeId)
  const [projects] = useProjects(themeId)
  const [, { execPost }] = useCaseCreate()

  /*
   ** Only fetch listing if there's a tonI
   ** Change the hook to useListing(tonId) when TON BE is ready.
   */
  const [listings] = useListings()
  // Remove foundListing when TON BE is ready for fetching one listing by id.
  const foundListing = listings?.find((listing) => listing.id === tonId)
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

  // If the user has been redirected via ton, fill out the form in advance.
  let initialValues = {
    theme: caseThemes?.results?.find(({ id }) => id === themeId),
    ...tonId ? {
      reason: reasons?.results?.find(({ name }) => name === "Project"),
      project: projects?.results?.[0], // TODO: Shouldn't this be the TON project?
      advertisement: "yes",
      advertisement_linklist: [{ advertisement_link: foundListing?.url }]
     } : {
      reason: reasons?.results?.[0]
     }
  }

  // TODO: SEND tonId to BE.
  // BE has to update the endpoint to fullfill this request. WZ-1491

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

import { useState, useEffect } from "react"
import scaffold from "./scaffold"
import { useCaseThemes, useReasons, useCaseCreate, useProjects, useListing } from "app/state/rest"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"

const TON_THEME_NAME = "Vakantieverhuur"
const TON_REASON_NAME = "Digitaal Toezicht"
const advertisementOptions = {
  yes: "Ja, er is een advertentie",
  no: "Nee, er is geen advertentie"
}

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  tonId?: number | undefined
}

type FormData =
  Pick<CaseCreate, "address" | "description"> &
  { theme: Components.Schemas.CaseTheme, reason: Components.Schemas.CaseReason, project: Components.Schemas.CaseProject }

const mapData = (bagId: Components.Schemas.Address["bag_id"], tonId: number | undefined) =>
  (data: FormData): CaseCreate => ({
    ...data,
    address: { bag_id: bagId },
    theme: data.theme.id,
    reason: data.reason.id,
    project: data.project?.id,
    ton_ids: tonId !== undefined ? [ tonId ] : undefined
  })

const CreateForm: React.FC<Props> = ({ bagId, tonId }) => {
  const [caseThemes] = useCaseThemes()
  const [themeId, setThemeId] = useState<Components.Schemas.CaseTheme["id"]>()

  useEffect(() => {
    const caseThemeId = tonId !== undefined
      ? caseThemes?.results?.find(({ name }) => name === TON_THEME_NAME)?.id
      : undefined
    setThemeId(caseThemeId)
  }, [tonId, caseThemes, setThemeId])

  const [reasons] = useReasons(themeId)
  const [projects] = useProjects(themeId)
  const [, { execPost }] = useCaseCreate()
  const [listing] = useListing(tonId)

  // Only show Vakantieverhuur, Digitaal Toezicht and Yes as an option for TON.
  const caseThemesOptions = tonId ? caseThemes?.results?.filter(({ name }) => name === TON_THEME_NAME) : caseThemes?.results
  const reasonOptions = tonId ? reasons?.results?.filter(({ name }) => name === TON_REASON_NAME) : reasons?.results
  const adOptions = tonId ? { yes: "Ja, er is een advertentie" } : advertisementOptions

  const fields = useScaffoldedFields(scaffold, bagId, setThemeId, caseThemesOptions, reasonOptions ?? [], projects?.results ?? [], adOptions)

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
  const initialValues = {
    theme: caseThemes?.results?.find(({ id }) => id === themeId),
    ...tonId !== undefined ? {
      reason: reasons?.results?.find(({ name }) => name === TON_REASON_NAME),
      advertisement: "yes",
      advertisement_linklist: [{ advertisement_link: listing?.url }]
     } : {}
  }

  return (
    <ConfirmScaffoldForm
      fields={ fields }
      postMethod={ execPost }
      mapData={ mapData(bagId, tonId) }
      afterSubmit={ afterSubmit }
      initialValues={ initialValues }
      submittingTitle="De zaak wordt aangemaakt. Wacht met sluiten van dit venster."
    />
  )
}

export default CreateForm

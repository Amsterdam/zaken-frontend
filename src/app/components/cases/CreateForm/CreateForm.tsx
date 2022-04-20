import { useState, useEffect } from "react"
import pick from "lodash.pick"
import scaffold from "./scaffold"
import {
  useCaseThemes, useReasons, useCaseCreate, useProjects,
  useListing, useSubjects, useCasesByBagId, useCorporations, useBAG
} from "app/state/rest"
import ConfirmScaffoldForm from "app/components/shared/ConfirmScaffoldForm/ConfirmScaffoldForm"
import useNavigateWithFlashMessage from "app/state/flashMessages/useNavigateWithFlashMessage"
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields"
import getAddressAsString from "app/components/addresses/utils/getAddressAsString"

const TON_THEME_NAME = "Vakantieverhuur"
const TON_REASON_NAME = "Digitaal toezicht"
const advertisementOptions = {
  yes: "Ja, er is een advertentie",
  no: "Nee, er is geen advertentie"
}

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  tonId?: number | undefined
}

const mapData = (bagId: Components.Schemas.Address["bag_id"], tonId: number | undefined) =>
  (data: any): any => {
    const mappedData = {
    ...data,
    bag_id: bagId,
    theme_id: data.theme.id,
    reason_id: data.reason.id,
    project_id: data.project?.id,
    ton_ids: tonId !== undefined ? [ tonId ] : undefined,
    subject_ids: data.subjects.map((subject: any) => subject.id),
    previous_case: data.previous_case?.id || undefined,
    housing_corporation: data.housing_corporation?.id || undefined
  }
  if (data.identification) {
    mappedData.citizen_reports = [{
      ...data,
      nuisance: Array.isArray(data?.nuisance) && data?.nuisance?.includes("nuisance"),
      advertisements: undefined
    }]
  }
  return mappedData
}

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
  const [subjects] = useSubjects(themeId)
  const [, { execPost }] = useCaseCreate()
  const [listing] = useListing(tonId)
  const [cases] = useCasesByBagId(bagId)
  const [corporations] = useCorporations()
  const [bagAddress] = useBAG(bagId)

  // Only show Vakantieverhuur, Digitaal Toezicht and Yes as an option for TON.
  const caseThemesOptions = tonId ? caseThemes?.results?.filter(({ name }) => name === TON_THEME_NAME) : caseThemes?.results
  const reasonOptions = tonId ? reasons?.results?.filter(({ name }) => name === TON_REASON_NAME)
    : reasons?.results?.filter(({ name }) => name !== TON_REASON_NAME)
  const adOptions = tonId ? pick(advertisementOptions, ["yes"]) : advertisementOptions

  // Get cases and sort them by id for the option to link a previous case.
  const casesArray = cases?.results ? [...cases.results] : []
  // Add a more explicit label to the options
  const casesWithLabel = casesArray.map((item) => ({
    ...item,
    label: `${ item.id }: ${ item?.theme?.name }`
  }))
  const sortedCases = casesWithLabel.sort((a, b) => (a.id > b.id) ? 1 : -1)

  const corporationsArray = corporations?.results ? [...corporations.results] : []
  const sortedCorporations = corporationsArray.sort((a, b) => a.name.localeCompare(b.name))

  const onChangeThemeId = (newThemeId: number | undefined) => {
    /**
     * use undefined first, otherwise the state does not necessarily change when switching themes
     * delay is needed for updating state twice
     */
    setThemeId(undefined)
    setTimeout(() => {
      setThemeId(newThemeId)
  }, 0)
  }

  /*
  ** themeId ?? -1 is ugly coding.
  ** Because it takes time to fetch the reasons after selecting a theme, the submit button is enabled.
  ** themeId = undefined will load a spinner for the entire page. :(
  */

  const fields = useScaffoldedFields(
    scaffold,
    bagId,
    themeId ?? -1,
    onChangeThemeId,
    caseThemesOptions,
    reasonOptions ?? [],
    projects?.results ?? [],
    subjects?.results ?? [],
    adOptions,
    sortedCases,
    sortedCorporations
  )

  const navigateWithFlashMessage = useNavigateWithFlashMessage()
  const afterSubmit = async (result: Components.Schemas.Case) =>
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
      advertisements: [{ link: listing?.url }]
     } : {}
  }

  const addressString = getAddressAsString(bagAddress)
  const title = `${ addressString } - Controleer de gegevens`

  return (
    <ConfirmScaffoldForm
      fields={ fields }
      postMethod={ execPost }
      mapData={ mapData(bagId, tonId) }
      afterSubmit={ afterSubmit }
      initialValues={ initialValues }
      submittingTitle="De zaak wordt aangemaakt. Wacht met sluiten van dit venster."
      title={ title }
    />
  )
}

export default CreateForm

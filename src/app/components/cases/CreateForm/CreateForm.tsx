import { useForm, useWatch } from "react-hook-form"
import { useNavigate } from "react-router"
import {
  Column,
  Heading,
  Label,
  Paragraph,
} from "@amsterdam/design-system-react"
import {
  CheckboxControl,
  CheckboxControlGroup,
  RadioControl,
  SelectControl,
  TextAreaControl,
  TextInputControl,
} from "@amsterdam/ee-ads-rhf"
import {
  useBagPdokByBagId,
  useCaseThemes,
  useCasesByBagId,
  useCorporations,
  useCreateCase,
  useListing,
  useProjects,
  useReasons,
  useSubjects,
} from "@/api/hooks"
import { FormPage } from "@/components/FormPage/FormPage"
import { useToast } from "@/components/toasts/useToast"
import { getAddressFromBagPdokResponse } from "app/components/addresses/utils"
import { AdvertisementFields } from "app/components/case/forms/CitizenReportForm/AdvertisementFields"
import { ReportFields } from "app/components/case/forms/CitizenReportForm/ReportFields"
import {
  type AdvertisementValues,
  controlOf,
  emptyAdvertisementValues,
  emptyReportValues,
  type ReportValues,
  toAdvertisements,
  toCitizenReport,
  YES,
} from "app/components/case/forms/CitizenReportForm/reportValues"
import { EXCLUDED_THEMES_ADVERTISEMENTS } from "app/constants/themeNames"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
  /** The listing in TON (digital surveillance) the case is made for. */
  tonId?: string
}

type Option = { label: string; value: string }

type FormValues = ReportValues &
  AdvertisementValues & {
    theme: string
    reason: string
    mma_number: string
    project: string
    housing_corporation: string
    subjects: string[]
    other_theme: boolean
    previous_case: string
    description: string
  }

// A case made for a listing in TON has this theme and this reason.
const TON_THEME_NAME = "Vakantieverhuur"
const TON_REASON_NAME = "Digitaal toezicht"
// The reasons that ask for more.
const REASON_MMA = "MMA"
const REASON_PROJECT = "Project"
const REASON_SIG = "SIG melding"

// How wide a field is, in characters: as wide as what is filled in there.
const MMA_NUMBER_SIZE = 10

const emptyValues: FormValues = {
  ...emptyReportValues,
  ...emptyAdvertisementValues,
  theme: "",
  reason: "",
  mma_number: "",
  project: "",
  housing_corporation: "",
  subjects: [],
  other_theme: false,
  previous_case: "",
  description: "",
}

const toOptions = (options: { id: number; name: string }[] = []): Option[] =>
  options.map(({ id, name }) => ({ label: name, value: String(id) }))

/**
 * The page to make a new case on an address: its theme and reason, and what
 * belongs to those (a project, a report of a citizen, advertisements, …).
 */
const CreateForm: React.FC<Props> = ({ bagId, tonId }) => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { data: bagAddressResponse } = useBagPdokByBagId(bagId)
  const address = getAddressFromBagPdokResponse(bagAddressResponse)
  const { data: themes } = useCaseThemes()
  const { data: listing } = useListing(tonId)
  const { data: cases } = useCasesByBagId(bagId)
  const { data: corporations } = useCorporations()
  const { mutateAsync: createCase, isPending } = useCreateCase()

  const isTon = tonId !== undefined
  // For a listing in TON only its own theme and reason can be chosen.
  const themeOptions = (themes?.results ?? []).filter(
    ({ name }) => !isTon || name === TON_THEME_NAME,
  )
  const tonThemeId = isTon ? themeOptions[0]?.id : undefined
  // The reasons of that theme, to fill in the reason for a listing in TON.
  const { data: tonReasons } = useReasons(tonThemeId)
  const tonReasonId = tonReasons?.results?.find(
    ({ name }) => name === TON_REASON_NAME,
  )?.id

  const form = useForm<FormValues>({
    defaultValues: emptyValues,
    // A case for a listing in TON starts filled in, once the theme, the
    // reason and the listing are loaded; what was already changed stays.
    values: isTon
      ? {
          ...emptyValues,
          theme: tonThemeId !== undefined ? String(tonThemeId) : "",
          reason: tonReasonId !== undefined ? String(tonReasonId) : "",
          advertisement: YES,
          advertisements: [{ link: listing?.url ?? "" }],
        }
      : undefined,
    resetOptions: { keepDirtyValues: true },
  })
  const [theme, reason] = useWatch({
    control: form.control,
    name: ["theme", "reason"],
  })

  // What can be chosen depends on the theme.
  const themeId = theme !== "" ? Number(theme) : undefined
  const themeName = themeOptions.find(({ id }) => id === themeId)?.name
  const { data: reasons } = useReasons(themeId)
  const { data: projects } = useProjects(themeId)
  const { data: subjects } = useSubjects(themeId)
  const reasonOptions = (reasons?.results ?? []).filter(
    ({ name }) => (name === TON_REASON_NAME) === isTon,
  )
  const reasonName = reasonOptions.find(({ id }) => String(id) === reason)?.name
  const hasTheme = themeId !== undefined
  // Some themes have no advertisements.
  const asksAdvertisement =
    themeName !== undefined &&
    !EXCLUDED_THEMES_ADVERTISEMENTS.includes(themeName)

  const sortedCorporations = [...(corporations?.results ?? [])].sort((a, b) =>
    a.name.localeCompare(b.name),
  )
  // The cases on this address, to say which one this case follows.
  const previousCases = [...(cases?.results ?? [])]
    .sort((a, b) => a.id - b.id)
    .map(({ id, theme }) => ({
      label: `${id}: ${theme?.name}`,
      value: String(id),
    }))

  const onSubmit = async (values: FormValues) => {
    let result: components["schemas"]["CaseDetail"]
    try {
      result = await createCase({
        bag_id: bagId,
        theme_id: Number(values.theme),
        reason_id: Number(values.reason),
        ...(reasonName === REASON_PROJECT && {
          project_id: Number(values.project),
        }),
        ...(reasonName === REASON_MMA && {
          mma_number: Number(values.mma_number),
        }),
        ...(reasonName === REASON_SIG && {
          citizen_reports: [toCitizenReport(values)],
        }),
        ...(values.housing_corporation !== "" && {
          housing_corporation: Number(values.housing_corporation),
        }),
        ...(asksAdvertisement &&
          values.advertisement === YES && {
            advertisements: toAdvertisements(values),
          }),
        subject_ids: values.subjects.map(Number),
        ...(values.other_theme && {
          previous_case: Number(values.previous_case),
        }),
        // Without an explanation the field is left out, as before.
        ...(values.description.trim() !== "" && {
          description: values.description,
        }),
        ...(isTon && { ton_ids: [tonId] }),
      })
    } catch {
      // The error is shown as a toast; the form stays.
      return
    }
    showToast({
      severity: "success",
      title: "Zaak aangemaakt",
      description: (
        <>
          Zaak <strong>{result.id}</strong> is toegevoegd.
        </>
      ),
    })
    navigate(`/zaken/${result.id}`)
  }

  return (
    <FormPage
      title="Nieuwe zaak aanmaken"
      form={form}
      onSubmit={onSubmit}
      submitText="Zaak aanmaken"
      isPending={isPending}
      onCancel={() => navigate(`/adres/${bagId}`)}
      summary={
        <Column gap="small">
          <Heading level={2}>Adres</Heading>
          <Paragraph>{address?.weergavenaam ?? "Adres laden…"}</Paragraph>
        </Column>
      }
    >
      <RadioControl<FormValues>
        name="theme"
        label="Kies het thema voor deze zaak"
        options={toOptions(themeOptions)}
        registerOptions={{
          required: "Kies een thema.",
          // What was chosen belongs to the other theme.
          onChange: () => {
            form.setValue("reason", "")
            form.setValue("project", "")
            form.setValue("subjects", [])
          },
        }}
      />
      <RadioControl<FormValues>
        name="reason"
        label="Aanleiding"
        options={toOptions(reasonOptions)}
        registerOptions={{ required: "Kies een aanleiding." }}
        shouldShow={hasTheme}
      />
      {reasonName === REASON_SIG && (
        <ReportFields
          control={controlOf(form.control)}
          asksNuisance={themeName === "Vakantieverhuur"}
        />
      )}
      <SelectControl<FormValues>
        name="project"
        label="Projectnaam"
        options={[
          { label: "Maak een keuze", value: "" },
          ...toOptions(projects?.results),
        ]}
        registerOptions={{ required: "Kies een project." }}
        shouldShow={reasonName === REASON_PROJECT}
      />
      <TextInputControl<FormValues>
        name="mma_number"
        label="MMA-nummer"
        // The keyboard for numbers.
        attributes={{ inputMode: "numeric" }}
        size={MMA_NUMBER_SIZE}
        registerOptions={{
          required: "Vul het MMA-nummer in.",
          pattern: {
            value: /^\s*[1-9]\d*\s*$/,
            message: "Vul het MMA-nummer in als een getal.",
          },
        }}
        shouldShow={reasonName === REASON_MMA}
      />
      <SelectControl<FormValues>
        name="housing_corporation"
        label="Selecteer de woningcorporatie"
        options={[
          { label: "Geen corporatie", value: "" },
          ...toOptions(sortedCorporations),
        ]}
        shouldShow={hasTheme && sortedCorporations.length > 0}
      />
      {asksAdvertisement && (
        <AdvertisementFields
          control={controlOf(form.control)}
          onlyYes={isTon}
        />
      )}
      <CheckboxControlGroup<FormValues>
        name="subjects"
        label="Onderwerp(en)"
        options={toOptions(subjects?.results)}
        registerOptions={{
          validate: (chosen) =>
            (Array.isArray(chosen) && chosen.length > 0) ||
            "Kies ten minste één onderwerp.",
        }}
        shouldShow={hasTheme}
      />
      {hasTheme && (
        <>
          <Label>Ander thema</Label>
          <CheckboxControl<FormValues>
            name="other_theme"
            label="Overgedragen vanuit ander thema"
          />
        </>
      )}
      <SelectControl<FormValues>
        name="previous_case"
        label="Overgedragen zaak ID"
        options={[{ label: "Maak een keuze", value: "" }, ...previousCases]}
        registerOptions={{ required: "Kies de zaak die is overgedragen." }}
        shouldShow={(watch) => hasTheme && watch("other_theme")}
      />
      <TextAreaControl<FormValues>
        name="description"
        label="Korte toelichting"
        rows={4}
        shouldShow={hasTheme}
      />
    </FormPage>
  )
}

export default CreateForm

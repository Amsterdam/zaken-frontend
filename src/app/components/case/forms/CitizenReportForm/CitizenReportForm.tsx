import { useFieldArray, useForm, useWatch } from "react-hook-form"
import { Button, Column, FieldSet } from "@amsterdam/design-system-react"
import { DeleteIcon, PlusIcon } from "@amsterdam/design-system-react-icons"
import {
  CheckboxControl,
  RadioControl,
  TextAreaControl,
  TextInputControl,
} from "@amsterdam/ee-ads-rhf"
import { useCase, useCreateCitizenReport } from "@/api/hooks"
import { CaseFormPage } from "app/components/case/CaseFormPage/CaseFormPage"
import { EXCLUDED_THEMES_ADVERTISEMENTS } from "app/constants/themeNames"
import isValidUrl from "app/routing/utils/isValidUrl"
import { useAfterCaseFormSubmit } from "../useAfterCaseFormSubmit"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

type FormValues = {
  reporter_anonymous: "" | typeof YES | typeof NO
  reporter_name: string
  reporter_phone: string
  reporter_email: string
  identification: string
  description_citizenreport: string
  nuisance: boolean
  advertisement: "" | typeof YES | typeof NO
  advertisements: { link: string }[]
}

const YES = "yes"
const NO = "no"

// How wide a field is, in characters: as wide as what is filled in there.
const NAME_SIZE = 40
const PHONE_SIZE = 12
const EMAIL_SIZE = 40
const SIG_NUMBER_SIZE = 10

const yesNo = (yes: string, no: string) => [
  { label: yes, value: YES },
  { label: no, value: NO },
]

/** The text when there is one, else the field is left out. */
const optional = <Key extends string>(key: Key, value: string) =>
  (value.trim() !== "" ? { [key]: value.trim() } : {}) as {
    [K in Key]?: string
  }

/** The page to process a report of a citizen (a SIG report) on a case. */
const CitizenReportForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: caseItem } = useCase(id)
  const themeName = caseItem?.theme.name
  const { mutateAsync: createCitizenReport, isPending } =
    useCreateCitizenReport(id)
  const afterSubmit = useAfterCaseFormSubmit(id)
  const form = useForm<FormValues>({
    defaultValues: {
      reporter_anonymous: "",
      reporter_name: "",
      reporter_phone: "",
      reporter_email: "",
      identification: "",
      description_citizenreport: "",
      nuisance: false,
      advertisement: "",
      advertisements: [{ link: "" }],
    },
  })
  const advertisements = useFieldArray({
    control: form.control,
    name: "advertisements",
  })
  const [anonymous, advertisement] = useWatch({
    control: form.control,
    name: ["reporter_anonymous", "advertisement"],
  })
  // Some themes have no advertisements.
  const asksAdvertisement =
    themeName !== undefined &&
    !EXCLUDED_THEMES_ADVERTISEMENTS.includes(themeName)
  const hasAdvertisement = asksAdvertisement && advertisement === YES

  const onSubmit = async (values: FormValues) => {
    try {
      await createCitizenReport({
        case: id,
        case_user_task_id: caseUserTaskId,
        // Who reported it, as far as known, unless the reporter is anonymous.
        ...(values.reporter_anonymous === NO && {
          ...optional("reporter_name", values.reporter_name),
          ...optional("reporter_phone", values.reporter_phone),
          ...optional("reporter_email", values.reporter_email),
        }),
        identification: Number(values.identification),
        description_citizenreport: values.description_citizenreport,
        nuisance: values.nuisance,
        ...(hasAdvertisement && {
          advertisements: values.advertisements.map(({ link }) => ({
            link: link.trim(),
          })),
        }),
      })
    } catch {
      // The error is shown as a message at the top of the page; the form stays.
      return
    }
    afterSubmit()
  }

  return (
    <CaseFormPage
      id={id}
      title="Melding verwerken"
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    >
      <RadioControl<FormValues>
        name="reporter_anonymous"
        label="Is de melder anoniem?"
        options={yesNo(
          "Ja, de melder is anoniem",
          "Nee, de melder is niet anoniem",
        )}
        registerOptions={{ required: "Kies of de melder anoniem is." }}
      />
      {anonymous === NO && (
        <FieldSet legend="Gegevens van de melder, voor zover bekend">
          <Column>
            <TextInputControl<FormValues>
              name="reporter_name"
              label="Naam melder"
              size={NAME_SIZE}
              inFieldSet
            />
            <TextInputControl<FormValues>
              name="reporter_phone"
              label="Telefoonnummer melder"
              description="Voer 10 cijfers in, zonder spaties of streepjes"
              type="tel"
              size={PHONE_SIZE}
              registerOptions={{
                pattern: {
                  value: /^\s*[0-9]{10}\s*$/,
                  message: "Gebruik 10 cijfers zonder spaties of streepjes",
                },
              }}
              inFieldSet
            />
            <TextInputControl<FormValues>
              name="reporter_email"
              label="E-mailadres melder"
              type="email"
              size={EMAIL_SIZE}
              registerOptions={{
                pattern: {
                  value: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/,
                  message: "Vul een geldig e-mailadres in.",
                },
              }}
              inFieldSet
            />
          </Column>
        </FieldSet>
      )}
      <TextInputControl<FormValues>
        name="identification"
        label="SIG-nummer"
        description="Voeg het SIG-meldingsnummer toe om de melding eenvoudig terug te vinden."
        // The keyboard for numbers.
        attributes={{ inputMode: "numeric" }}
        size={SIG_NUMBER_SIZE}
        registerOptions={{
          required: "Vul het SIG-nummer in.",
          pattern: {
            value: /^\s*[1-9]\d*\s*$/,
            message: "Vul het SIG-nummer in als een getal.",
          },
        }}
      />
      <TextAreaControl<FormValues>
        name="description_citizenreport"
        label="Korte samenvatting melding"
        description="Deze gegevens worden ook in TOP opgenomen voor de toezichthouder."
        rows={4}
        registerOptions={{
          required: "Vul een samenvatting van de melding in.",
        }}
      />
      {themeName === "Vakantieverhuur" && (
        <CheckboxControl<FormValues>
          name="nuisance"
          label="Betreft overlast"
          description="Vink aan als de melding over overlast gaat, zoals geluid, lawaai, stank en vuil."
        />
      )}
      {asksAdvertisement && (
        <RadioControl<FormValues>
          name="advertisement"
          label="Is er een advertentie bekend?"
          options={yesNo(
            "Ja, er is een advertentie",
            "Nee, er is geen advertentie",
          )}
          registerOptions={{
            required: "Kies of er een advertentie bekend is.",
          }}
        />
      )}
      {hasAdvertisement && (
        <FieldSet legend="Link(s) naar de advertentie">
          <Column>
            {advertisements.fields.map((field, index) => {
              const number = index + 1
              return (
                <Column key={field.id} gap="small">
                  <TextInputControl<FormValues>
                    name={`advertisements.${index}.link`}
                    label={`Link ${number}`}
                    description="De volledige url, met http:// of https:// ervoor."
                    type="url"
                    registerOptions={{
                      required: `Vul link ${number} naar de advertentie in.`,
                      validate: (link) =>
                        isValidUrl(String(link).trim()) ||
                        `Link ${number} is geen geldige url.`,
                    }}
                    inFieldSet
                  />
                  {advertisements.fields.length > 1 && (
                    <div>
                      <Button
                        type="button"
                        variant="secondary"
                        icon={DeleteIcon}
                        iconBefore
                        onClick={() => advertisements.remove(index)}
                      >
                        Link {number} verwijderen
                      </Button>
                    </div>
                  )}
                </Column>
              )
            })}
            <div>
              <Button
                type="button"
                variant="secondary"
                icon={PlusIcon}
                iconBefore
                onClick={() => advertisements.append({ link: "" })}
              >
                Link toevoegen
              </Button>
            </div>
          </Column>
        </FieldSet>
      )}
    </CaseFormPage>
  )
}

export default CitizenReportForm

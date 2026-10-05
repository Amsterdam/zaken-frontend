import { type Control, useWatch } from "react-hook-form"
import { Column, FieldSet } from "@amsterdam/design-system-react"
import {
  CheckboxControl,
  RadioControl,
  TextAreaControl,
  TextInputControl,
} from "@amsterdam/ee-ads-rhf"
import { NO, type ReportValues, YES } from "./reportValues"

type Props = {
  control: Control<ReportValues>
  /** Whether the report can be about nuisance: for the theme Vakantieverhuur. */
  asksNuisance: boolean
}

// How wide a field is, in characters: as wide as what is filled in there.
const NAME_SIZE = 40
const PHONE_SIZE = 12
const EMAIL_SIZE = 40
const SIG_NUMBER_SIZE = 10

/**
 * The fields of the report of a citizen (a SIG report): who reported it, its
 * number in SIG and what it is about. For a form that has these fields.
 */
export const ReportFields: React.FC<Props> = ({ control, asksNuisance }) => {
  const anonymous = useWatch({ control, name: "reporter_anonymous" })

  return (
    <>
      <RadioControl<ReportValues>
        name="reporter_anonymous"
        label="Is de melder anoniem?"
        options={[
          { label: "Ja, de melder is anoniem", value: YES },
          { label: "Nee, de melder is niet anoniem", value: NO },
        ]}
        registerOptions={{ required: "Kies of de melder anoniem is." }}
      />
      {anonymous === NO && (
        <FieldSet legend="Gegevens van de melder, voor zover bekend">
          <Column>
            <TextInputControl<ReportValues>
              name="reporter_name"
              label="Naam melder"
              size={NAME_SIZE}
              inFieldSet
            />
            <TextInputControl<ReportValues>
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
            <TextInputControl<ReportValues>
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
      <TextInputControl<ReportValues>
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
      <TextAreaControl<ReportValues>
        name="description_citizenreport"
        label="Korte samenvatting melding"
        description="Deze gegevens worden ook in TOP opgenomen voor de toezichthouder."
        rows={4}
        registerOptions={{
          required: "Vul een samenvatting van de melding in.",
        }}
      />
      <CheckboxControl<ReportValues>
        name="nuisance"
        label="Betreft overlast"
        description="Vink aan als de melding over overlast gaat, zoals geluid, lawaai, stank en vuil."
        shouldShow={asksNuisance}
      />
    </>
  )
}

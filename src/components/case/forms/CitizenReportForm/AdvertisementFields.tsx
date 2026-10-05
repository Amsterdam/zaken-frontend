import { type Control, useFieldArray, useWatch } from "react-hook-form"
import { Button, Column, FieldSet } from "@amsterdam/design-system-react"
import { DeleteIcon, PlusIcon } from "@amsterdam/design-system-react-icons"
import { RadioControl, TextInputControl } from "@amsterdam/ee-ads-rhf"
import isValidUrl from "@/shared/isValidUrl"
import { type AdvertisementValues, NO, YES } from "./reportValues"

type Props = {
  control: Control<AdvertisementValues>
  /** There is an advertisement for sure (e.g. the case comes from one). */
  onlyYes?: boolean
}

/**
 * The fields for the advertisements of an address: whether there is one, and
 * if so the links to them (at least one). For a form that has these fields.
 */
export const AdvertisementFields: React.FC<Props> = ({
  control,
  onlyYes = false,
}) => {
  const advertisement = useWatch({ control, name: "advertisement" })
  const advertisements = useFieldArray({ control, name: "advertisements" })

  return (
    <>
      <RadioControl<AdvertisementValues>
        name="advertisement"
        label="Is er een advertentie bekend?"
        options={[
          { label: "Ja, er is een advertentie", value: YES },
          ...(onlyYes
            ? []
            : [{ label: "Nee, er is geen advertentie", value: NO }]),
        ]}
        registerOptions={{
          required: "Kies of er een advertentie bekend is.",
        }}
      />
      {advertisement === YES && (
        <FieldSet legend="Link(s) naar de advertentie">
          <Column>
            {advertisements.fields.map((field, index) => {
              const number = index + 1
              return (
                <Column key={field.id} gap="small">
                  <TextInputControl<AdvertisementValues>
                    name={`advertisements.${index}.link`}
                    label={`Link ${number}`}
                    description="De volledige url met https:// ervoor."
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
    </>
  )
}

export default AdvertisementFields

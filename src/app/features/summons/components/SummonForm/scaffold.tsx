import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import InfoButton from "app/features/shared/components/molecules/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], summons: MockComponents.Schemas.Summon[]) => {

  const summonsObject = summons.reduce((acc, cur) => {
    acc[`summon.${ cur.id }`] = cur.title
    return acc
  }, {} as Record<string, string>)

  const fields = {
    summons: {
      type: "ArrayField",
      props: {
        columns: "auto",
        name: "summonsArray",
        allowAdd: true,
        allowRemove: true,
        minItems: 1,
        maxItems: 2,
        scaffoldFields: {
          summon: {
            type: "SelectField",
            props: {
              isRequired: true,
              withEmptyOption: true,
              label: "Welke aanschrijving is opgesteld?",
              extraLabel: <InfoButton infoTitle="TODO Aanschrijvingen" infoText="TODO Uitleg over aanschrijvingen"></InfoButton>,
              name: "summons",
              options: summonsObject
            }
          },
          receivers: {
            type: "ArrayField",
            props: {
              label: "Aan wie is de aanschrijvng gericht?",
              columns: "1fr 1fr 1fr auto",
              name: "receivers",
              allowAdd: true,
              allowRemove: true,
              minItems: 1,
              maxItems: 2,
              scaffoldFields: {
                first_name: {
                  type: "TextField",
                  props: {
                    name: "first_name",
                    placeholder: "Voornaam"
                  }
                },
                preposition: {
                  type: "TextField",
                  props: {
                    name: "preposition",
                    placeholder: "Tussenvoegsel"
                  }
                },
                last_name: {
                  type: "TextField",
                  props: {
                    name: "last_name",
                    placeholder: "Achternaam"
                  }
                }
              }
            }
          },
          text: {
            type: "TextAreaField",
            props: {
              label: "Korte toelichting",
              extraLabel: "(Niet verplicht)",
              name: "text"
            }
          }
        }
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Resultaat verwerken"
      }
    },
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleren",
        variant: "primaryInverted",
        onClick: () => navigateTo(`/zaken/${ caseId }`)
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", [
      // ["summon", "summon", "summon"],
      // ["receivers", "receivers", "receivers"],
      // ["text", "text", "text"],
      ["summons", "summons", "summons"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}


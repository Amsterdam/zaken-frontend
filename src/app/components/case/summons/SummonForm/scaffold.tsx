import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], summonTypes: Components.Schemas.SummonType[]) => {

  const fields = {
    type: {
      type: "ComplexSelectField",
      props: {
        isRequired: true,
        withEmptyOption: true,
        label: "Welke aanschrijving is opgesteld?",
        extraLabel: <InfoButton infoTitle="Meerdere aanschrijvingen?" infoText="Kies de aanschrijving die verstuurd is. Zijn er meerdere aanschrijvingen verstuurd, dan is het mogelijk na de afronding van dit formulier nog een aanschrijving toe te voegen. Geef hier tevens weer aan, aan wie de aanschrijving gericht is."></InfoButton>,
        name: "type",
        optionLabelField: "name",
        options: summonTypes
      }
    },
    persons: {
      type: "ArrayField",
      props: {
        label: "Aan wie is de aanschrijving gericht?",
        name: "persons",
        allowAdd: true,
        allowRemove: true,
        minItems: 1,
        maxItems: 2,
        scaffoldFields: {
          first_name: {
            type: "TextField",
            props: {
              placeholder:"Voornaam",
              name: "first_name",
              isRequired: true
            }
          },
          preposition: {
            type: "TextField",
            props: {
              placeholder:"Tussenvoegsel",
              name: "preposition"
            }
          },
          last_name: {
            type: "TextField",
            props: {
              placeholder: "Achternaam",
              name: "last_name",
              isRequired: true
            }
          }
        }
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        extraLabel: "(Niet verplicht)",
        name: "description"
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
    .setGrid("laptop", "1fr 1fr 1fr", [
      ["type", "type", "type"],
      ["persons", "persons", "persons"],
      ["description", "description", "description"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}


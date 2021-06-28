import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], summonTypes?: Components.Schemas.SummonType[]) => {

  const fields = {
    type: {
      type: "ComplexSelectField",
      props: {
        isRequired: true,
        withEmptyOption: true,
        label: "Welke aanschrijving is opgesteld?",
        extraLabel: <InfoButton infoTitle="Meerdere aanschrijvingen?" infoText="Verwerk eerst deze aanschrijving. Selecteer vervolgens bij ‘Taak opvoeren' op de zaakdetail pagina 'Opstellen concept aanschrijving’. Vul vervolgens het formulier in en rond af met de knop resultaat verwerken. Herhaal deze actie per opgestelde aanschrijving."></InfoButton>,
        name: "type",
        optionLabelField: "name",
        options: summonTypes
      }
    },
    number_of_accommodations: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { type } }: { values: { type: Components.Schemas.SummonType } }) => type?.id === 14,
        field: {
          type: "NumberField",
          props: {
            isRequired: true,
            label: "Aantal gesloten logiesverblijven",
            name: "type_result.number_of_accommodations",
            min: 0
          }
        }
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
    secondaryButton: {
      type: "Button",
      props: {
        label: "Annuleren",
        variant: "primaryInverted",
        onClick: () => navigateTo("/zaken/:id", { id: caseId })
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Resultaat verwerken",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["type", "type"],
      ["number_of_accommodations"],
      ["persons", "persons"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}


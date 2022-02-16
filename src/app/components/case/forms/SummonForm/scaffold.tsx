import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"
import { personRoleMap } from "@amsterdam/wonen-ui/helpers/dictionaries"

export default (caseId: Components.Schemas.Case["id"], summonTypes?: Components.Schemas.SummonType[]) => {

  const personRoles = Object.entries(personRoleMap).map(([key, label]) => ({ key, label }))
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
    "type_result.number_of_accommodations": {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: { type: Components.Schemas.SummonType } }) => formValues?.values?.type?.workflow_option === "sluiting",
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
    entityType: {
      type: "RadioFields",
      props: {
        isRequired: true,
        horizontal: true,
        name: "entity_type",
        label: "Aan wie is de aanschrijving gericht?",
        options: {
          natural: "Natuurlijk persoon",
          legal: "Rechtspersoon"
        }
      }
    },
    boardRole: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: {legal_entity_type: string}}) => formValues?.values?.legal_entity_type === "board",
        field: {
          type: "ComplexSelectField",
          props: {
            options: personRoles,
            name: "board_role",
            optionLabelField: "label",
            isRequired: true,
            withEmptyOption: true,
            emptyOptionLabel: "Kies rol van bestuur"
          }
        }
      }
    },
    legalEntityName: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: {entity_type: string}}) => formValues?.values?.entity_type === "legal",
        field: {
          type: "InputField",
          props: {
            name: "legal_entity_name",
            isRequired: true,
            label: "Aangeschreven rechtspersoon",
            placeholder: "Bedrijfsnaam"
          }
        }
      }
    },
    legalEntityType: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: {entity_type: string}}) => formValues?.values?.entity_type === "legal",
        field: {
          type: "SelectField",
          props: {
            name: "legal_entity_type",
            withEmptyOption: true,
            emptyOptionLabel: "Kies type",
            isRequired: true,
            options: {
              board: "Aan bestuur",
              person: "Aan persoon"
            }
          }
        }
      }
    },
    persons: {
      type: "ShowHide",
      props: {
        shouldShow: (formValues: { values?: {
            entity_type: string
            legal_entity_type: string
          }}) => (
          formValues?.values?.entity_type === "natural" ||
          formValues?.values?.legal_entity_type === "person"
        ),
        field: {
          type: "ArrayField",
          props: {
            label: "Aangeschreven persoon",
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
              },
              person_role: {
                type: "ComplexSelectField",
                props: {
                  options: personRoles,
                  name: "person_role",
                  optionLabelField: "label",
                  isRequired: true,
                  withEmptyOption: true,
                  emptyOptionLabel: "Kies rol"
                }
              }
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
      ["type_result.number_of_accommodations"],
      ["entityType", "entityType"],
      ["legalEntityName", "legalEntityName"],
      ["legalEntityType", "boardRole"],
      ["persons", "persons"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}


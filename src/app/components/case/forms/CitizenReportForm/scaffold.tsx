import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import InfoButton from "app/components/shared/InfoHeading/InfoButton"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"]) => {


  const fields = {
    reporter_anonymous: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "reporter_anonymous",
        label: "Is de melder anoniem?",
        options: {
          yes: "Ja, de melder is anoniem",
          no: "Nee, de melder is niet anoniem"
        }
      }
    },
    reporter_name: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { reporter_anonymous } }: { values: { reporter_anonymous: string } }) => reporter_anonymous === "no",
        field: {
          type: "TextField",
          props: {
            label: "Naam melder",
            name: "reporter_name",
            isRequired: true
          }
        }
      }
    },
    reporter_phone: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { reporter_anonymous } }: { values: { reporter_anonymous: string } }) => reporter_anonymous === "no",
        field: {
          type: "TelField",
          props: {
            label: "Telefoonnummer melder",
            name: "reporter_phone",
            hint: "Vul hier alleen cijfers in",
            isRequired: true,
            validate: (value: string) => /^\d{10}$/.test(value) ? false : "Vul hier enkel 10 cijfers in"
          }
        }
      }
    },
    identification: {
      type: "NumberField",
      props: {
        label: "SIA-nummer",
        extraLabel: <InfoButton infoTitle="SIA-nummer" infoText="Vermeld hier het corresponderende SIA-nummer, zodat de melding makkelijk terug te vinden is in SIA."></InfoButton>,
        name: "identification",
        placeholder: "123456",
        min: 1,
        step: 1,
        isRequired: true,
        hideNumberSpinner: true
      }
    },
    advertisement: {
      type: "RadioFields",
      props: {
        isRequired: true,
        name: "advertisement",
        label: "Is er een advertentie bekend?",
        options: {
          yes: "Ja, er is een advertentie",
          no: "Nee, er is geen advertentie"
        }
      }
    },
    advertisement_linklist: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { advertisement } }: { values: { advertisement: string } }) => advertisement === "yes",
        field: {
          type: "ArrayField",
          props: {
            label: "Link(s) naar de advertentie",
            name: "advertisement_linklist",
            isRequired: true,
            allowAdd: true,
            allowRemove: true,
            minItems: 1,
            scaffoldFields: {
              advertisement_link: {
                type: "TextField",
                props: {
                  placeholder: "Link naar de advertentie",
                  name: "advertisement_link",
                  isRequired: true
                }
              }
            }
          }
        }
      }
    },
    description_citizenreport: {
      type: "TextAreaField",
      props: {
        label: "Korte samenvatting melding",
        extraLabel: <InfoButton infoTitle="Korte samenvatting melding" infoText="Geef een korte beschrijving van de melding. Deze informatie komt ook door in TOP voor de toezichthouder."></InfoButton>,
        name: "description_citizenreport",
        isRequired: true
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
      ["reporter_anonymous", "reporter_anonymous"],
      ["reporter_name"],
      ["reporter_phone"],
      ["identification"],
      ["advertisement", "advertisement"],
      ["advertisement_linklist", "advertisement_linklist"],
      ["description_citizenreport", "description_citizenreport"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}


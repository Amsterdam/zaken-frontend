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
          type: "TextField",
          props: {
            label: "Telefoonnummer melder",
            name: "reporter_phone",
            isRequired: true
          }
        }
      }
    },
    identification: {
      type: "TextField",
      props: {
        label: "SIA-nummer",
        hint:"123456",
        placeholder:"123456",
        extraLabel: <InfoButton infoTitle="SIA-nummer" infoText="Vermeld hier het corresponderende SIA-nummer, zodat de melding makkelijk terug te vindein is in SIA."></InfoButton>,
        name: "identification",
        isRequired: true
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting melding",
        extraLabel: <InfoButton infoTitle="Korte toelichting melding" infoText="Geef een korte beschrijving van de melding. Deze informatie komt ook door in TOP voor de toezichthouder."></InfoButton>,
        name: "description",
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
      ["reporter_name", "reporter_phone"],
      ["identification", "identification"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}


import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], completeCases: MockComponents.Schemas.CompleteCase[]) => {

  const fields = {
    complete: {
      type: "ComplexRadioFields",
      props: {
        isRequired: true,
        label: "Wat is de vervolgstap in deze zaak?",
        name: "complete",
        optionLabelField: "title",
        options: completeCases
      }
    },
    text: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        name: "text",
        isRequired: true
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        label: "Verwerken"
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
    .setGrid("laptop", "1fr 1fr 1fr 1fr", [
      ["complete", "complete", "complete", "complete"],
      ["text", "text", "text", "text"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}


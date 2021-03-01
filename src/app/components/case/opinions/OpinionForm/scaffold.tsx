import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

const Scaffold = (caseId: Components.Schemas.Case["id"], opinions: MockComponents.Schemas.Opinion[], summonTitle = "") => {

  const fields = {
    opinions: {
      type: "ComplexRadioFields",
      props: {
        isRequired: true,
        label: `Wat is de uitkomst van de zienswijze: ${ summonTitle }?`,
        name: "opinions",
        optionLabelField: "title",
        options: opinions
      }
    },
    text: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        extraLabel: "(Niet verplicht)",
        name: "text",
        isRequired: false
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
      ["opinions", "opinions", "opinions"],
      ["text", "text", "text"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}

export default Scaffold

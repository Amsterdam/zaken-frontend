import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], decisions: MockComponents.Schemas.Decision[]) => {

  const decisionsObject = decisions.reduce((acc, cur) => {
    acc[`decision.${ cur.id }`] = cur.title
    return acc
  }, {} as Record<string, string>)


  const fields = {
    decisions: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Wat is het resultaat besluit?",
        name: "decisions",
        options: decisionsObject
      }
    },
    text: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        extraLabel: "(niet verplicht)",
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
      ["decisions", "decisions", "decisions"],
      ["text", "text", "text"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}


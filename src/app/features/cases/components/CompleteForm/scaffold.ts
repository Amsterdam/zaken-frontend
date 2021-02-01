import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import navigateTo from "app/features/shared/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], completeCase: MockComponents.Schemas.CompleteCase[]) => {

  const completeCaseObject = completeCase.reduce((acc, cur) => {
    acc[`completecase.${ cur.id }`] = cur.title
    return acc
  }, {} as Record<string, string>)


  const fields = {
    complete: {
      type: "RadioFields",
      props: {
        isRequired: true,
        label: "Wat is de vervolgstap in deze zaak?",
        name: "complete",
        options: completeCaseObject
      }
    },
    text: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        name: "text",
        isRequired: false
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
    .setGrid("laptop", "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", [
      ["complete", "complete", "complete"],
      ["text", "text"],
      ["submit", "secondaryButton"]
    ])
    .getScaffoldProps()
}


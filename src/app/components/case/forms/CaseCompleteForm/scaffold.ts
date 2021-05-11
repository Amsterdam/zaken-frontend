import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], completeCases?: MockComponents.Schemas.CompleteCaseResult[], completeCaseReasons?: MockComponents.Schemas.CompleteCaseReason[]) => {

  const fields = {
    reason: {
      type: "ComplexRadioFields",
          props: {
            isRequired: true,
            label: "Wat is de reden?",
            name: "reason",
            optionLabelField: "name",
            options: completeCaseReasons
          }
    },
    result: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { result } }: { values: { result: MockComponents.Schemas.CompleteCaseReason } }) => result?.value === "result_revisit",
        field: {
          type: "ComplexRadioFields",
          props: {
            isRequired: true,
            label: "Wat is het resultaat?",
            name: "result",
            optionLabelField: "title",
            options: completeCases
          }
          
        }
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Toelichting",
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
        label: "Verwerken",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr 1fr", [
      ["result", "result"],
      ["reasons_result_yes", "reasons_result_yes"],
      ["reasons_result_no", "reasons_result_no"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}


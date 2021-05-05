import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], completeCases?: MockComponents.Schemas.CompleteCase[], completeCaseReasonsNo?: MockComponents.Schemas.CompleteCaseReason[], completeCaseReasonsYes?: MockComponents.Schemas.CompleteCaseReason[]) => {

  const fields = {
    result: {
      type: "ComplexRadioFields",
      props: {
        isRequired: true,
        label: "Is er resultaat geboekt?",
        name: "result",
        optionLabelField: "title",
        options: completeCases
      }
    },
    reasons_result_yes: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { result } }: { values: { result: MockComponents.Schemas.CompleteCase } }) => result?.value === "result_yes",
        field: {
          type: "ComplexRadioFields",
          props: {
            isRequired: true,
            label: "Wat is de reden?",
            name: "reasons_result_yes",
            optionLabelField: "name",
            options: completeCaseReasonsYes,
            withEmptyOption: true,
            emptyOptionLabel: "Maak een keuze"
          }
        }
      }
    },
    reasons_result_no: {
      type: "ShowHide",
      props: {
        shouldShow: ({ values: { result } }: { values: { result: MockComponents.Schemas.CompleteCase } }) => result?.value === "result_no",
        field: {
          type: "ComplexRadioFields",
          props: {
            isRequired: true,
            label: "Wat is de reden?",
            name: "reasons_result_no",
            optionLabelField: "name",
            options: completeCaseReasonsNo,
            withEmptyOption: true,
            emptyOptionLabel: "Maak een keuze"
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


import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.Case["id"], completeCaseReasons?: Components.Schemas.CaseCloseReason[], completeCaseResults?: Components.Schemas.CaseCloseResult[]) => {

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
        shouldShow: (formValues: { values: { reason: Components.Schemas.CaseCloseReason } }) => formValues?.values?.reason?.result === true,
        field: {
          type: "ComplexRadioFields",
          props: {
            isRequired: true,
            label: "Wat is het resultaat?",
            name: "result",
            optionLabelField: "name",
            options: completeCaseResults
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
      ["reason", "reason"],
      ["result", "result"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}


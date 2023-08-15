import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import navigateTo from "app/routing/navigateTo"

export default (caseId: Components.Schemas.CaseDetail["id"], quickDecisionTypes?: Components.Schemas.QuickDecisionType[]) => {

  const fields = {
    quick_decision_type: {
      type: "ComplexSelectField",
      props: {
        isRequired: true,
        label: "Welk besluit is opgesteld?",
        name: "quick_decision_type",
        optionLabelField: "name",
        options: quickDecisionTypes,
        withEmptyOption: true,
        emptyOptionLabel: "Maak een keuze"
      }
    },
    description: {
      type: "TextAreaField",
      props: {
        label: "Korte toelichting",
        extraLabel: "(niet verplicht)",
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
        variant: "secondary",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["quick_decision_type", "quick_decision_type"],
      ["description", "description"],
      ["secondaryButton", "submit"]
    ])
    .getScaffoldProps()
}


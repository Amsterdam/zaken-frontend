import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import type { NavigateToFunction } from "app/routing/useNavigation"

export default (
  id: Components.Schemas.CaseDetail["id"],
  navigateTo: NavigateToFunction,
  processes?: Components.Schemas.WorkflowOption[]
) => {
  const fields = {
    workflowProcess: {
      type: "ComplexSelectField",
      props: {
        name: "workflowProcess",
        label: "Taak opvoeren",
        optionLabelField: "name",
        withEmptyOption: true,
        emptyOptionLabel: "Selecteer een taak",
        isRequired: true,
        options: processes
      }
    },
    cancel: {
      type: "Button",
      props: {
        label: "Annuleren",
        variant: "primaryInverted",
        onClick: () => navigateTo("/zaken/:id", { id })
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        variant: "secondary",
        label: "Taak opvoeren",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["workflowProcess", "workflowProcess"],
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}

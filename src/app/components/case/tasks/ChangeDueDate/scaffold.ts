import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"


const Scaffold = (onCancel: () => void, minDate: string) => {
  const fields = {
    dueDate: {
      type: "DateField",
      props: {
        label: "Nieuwe datum",
        name: "due_date",
        min: minDate,
        isRequired: true
      }
    },
    submit: {
      type: "SubmitButton",
      variant: "primary",
      props: {
        label: "Verwerken"
      }
    },
    cancel: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: onCancel
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("laptop", "1fr 1fr", [
      ["dueDate"],
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}

export default Scaffold
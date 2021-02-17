import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"


const Scaffold = (onCancel: () => void, dueDate: string) => {
  const fields = {
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
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}

export default Scaffold
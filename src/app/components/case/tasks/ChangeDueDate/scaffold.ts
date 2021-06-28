import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const scaffold = (onCancel: () => void, minDate: string) => {
  const fields = {
    dueDate: {
      type: "DateField",
      props: {
        label: "Nieuwe datum",
        name: "date",
        min: minDate,
        isRequired: true
      }
    },
    cancel: {
      type: "Button",
      props: {
        label: "Annuleer",
        variant: "primaryInverted",
        onClick: onCancel
      }
    },
    submit: {
      type: "SubmitButton",
      variant: "primary",
      props: {
        label: "Verwerken",
        align: "right"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["dueDate", "dueDate"],
      ["cancel", "submit"]
    ])
    .setGrid("laptopM", "1fr 1fr", [
      ["dueDate"],
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}

export default scaffold

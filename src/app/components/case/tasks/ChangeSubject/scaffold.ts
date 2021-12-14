import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const scaffold = (onCancel: () => void) => {
  const fields = {
    subjects: {
      type: "CheckboxFields",
          props: {
            label: "Onderwerp",
            name: "subjects",
            options: {
              1: "Niet",
              2: "Kloppen"
            }
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
      ["subjects", "subjects"],
      ["cancel", "submit"]
    ])
    .setGrid("laptopM", "1fr 1fr", [
      ["subjects"],
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}

export default scaffold

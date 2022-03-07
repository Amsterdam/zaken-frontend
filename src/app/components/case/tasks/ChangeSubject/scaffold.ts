import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const scaffold = (onCancel: () => void, subjects?: Components.Schemas.Subject[]) => {
  const fields = {
    subjects: {
      type: "ComplexCheckboxFields",
        props: {
          label: "Onderwerp",
          name: "subjects",
          options: subjects,
          optionLabelField: "name",
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
      ["subjects", "subjects"],
      ["cancel", "submit"]
    ])
    .setGrid("laptopM", "1fr 1fr", [
      ["subjects", "subjects"],
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}

export default scaffold

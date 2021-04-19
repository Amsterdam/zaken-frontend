import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

export default () => {

  const fields = {
    task: {
      type: "ComplexSelectField",
      props: {
        name: "task",
        label: "Taak",
        optionLabelField: "label",
        options: [
          { label: "Bezwaardossier", value: 1 },
          { label: "Correspondentie", value: 2 },
          { label: "Terugbelverzoek", value: 3 }
        ]
      }
    },
    submit: {
      type: "SubmitButton",
      props: {
        variant: "tertiary",
        label: "Taak opvoeren"
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ["task", "submit"]
    ])
    .getScaffoldProps()
}

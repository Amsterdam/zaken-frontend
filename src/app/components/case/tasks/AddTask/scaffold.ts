import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

export default (onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void) => {

  const fields = {
    task: {
      type: "ComplexSelectField",
      props: {
        name: "task",
        optionLabelField: "label",
        options: [
          { label: "Bezwaardossier", value: 1 },
          { label: "Correspondentie", value: 2 },
          { label: "Terugbelverzoek", value: 3 }
        ],
        onChange
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .getScaffoldProps()
}

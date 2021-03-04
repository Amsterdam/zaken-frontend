import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

export default (onChange: (value: string) => void) => {

  const fields = {
    task: { 
      type: "ComplexSelectField", 
      props: {
        name: "task",
        optionLabelField: "label",
        withEmptyOption: true,
        emptyOptionLabel: "Taak opvoeren",
        options: [
          { label: "Opstellen concept aanschrijving", value: "1" }
        ],
        onChange
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .getScaffoldProps()
}

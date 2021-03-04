import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

export default (onChange: (value: string) => void) => {

  const fields = {
    select: { 
      type: "ComplexSelectField", 
      props: {
        name: "select",
        optionLabelField: "label",
        options: [
          { label: "Taak opvoeren", value: "0" },
          { label: "Opstellen concept aanschrijving", value: "1" }
        ],
        onChange
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .getScaffoldProps()
}

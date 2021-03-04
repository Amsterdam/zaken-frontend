import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

export default (onChange: (value: string) => void) => {

  const fields = {
    task: {
      type: "SelectField",
      props: {
        name: "task",
        options: ["Taak opvoeren", "Opstellen concept aanschrijving"], // TODO use endpoint
        onChange
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .getScaffoldProps()
}


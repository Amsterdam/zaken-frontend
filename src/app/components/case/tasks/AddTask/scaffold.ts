import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const tasks = ["Taak opvoeren", "Opstellen concept aanschrijving"]
export default (onChange: (value: string) => void) => {

  const fields = {
    task: {
      type: "SelectField",
      props: {
        name: "task",
        options: tasks,
        onChange: onChange
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .getScaffoldProps()
}


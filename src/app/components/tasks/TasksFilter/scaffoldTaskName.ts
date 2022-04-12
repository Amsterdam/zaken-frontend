import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import { BaseSyntheticEvent } from "react"

export default (value: string, onChange: (value: string) => void, taskNames: Components.Schemas.CaseUserTaskName[] = []) => {
  const taskNamesOptions = Object.fromEntries(taskNames.map(name => [name.name, name.name]))
  const fields = {
    taskName: {
      type: "SelectField",
      props: {
        label: "Taak naam",
        name: "taskName",
        options: {
          "": "Alle",
          ...taskNamesOptions
        },
        onChange: (value: BaseSyntheticEvent) => onChange(value.target.value) ,
        value
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

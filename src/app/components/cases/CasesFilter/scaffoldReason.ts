import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import { BaseSyntheticEvent } from "react"

export default (value: string, onChange: (value: string) => void, reasons: Components.Schemas.CaseReason[] = []) => {
  const reasonsOptions = Object.fromEntries(reasons.map(name => [name, name]))
  const fields = {
    taskName: {
      type: "SelectField",
      props: {
        label: "Aanleiding",
        name: "reason",
        options: {
          "": "Alle",
          ...reasonsOptions
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

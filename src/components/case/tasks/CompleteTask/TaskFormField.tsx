import { Paragraph } from "@amsterdam/design-system-react"
import {
  CheckboxControl,
  CheckboxControlGroup,
  SelectControl,
  TextAreaControl,
  TextInputControl,
} from "@amsterdam/ee-ads-rhf"
import { NUMBER, type TaskFormValues } from "./taskFormValues"

type Props = {
  field: Tasks.FormField
}

// The backend writes this in some labels itself; the field already says it.
const NOT_REQUIRED = /\s*\(niet verplicht\)\s*$/i

/**
 * One field of the form of a task, as the backend describes it: a select
 * list, a checkbox, a group of checkboxes, a number or a text.
 */
export const TaskFormField: React.FC<Props> = ({ field }) => {
  const { name, type, required = false, options = [] } = field
  const label = field.label.replace(NOT_REQUIRED, "")
  const selectOptions = options.map((option) => ({
    label: option.label,
    value: String(option.value),
  }))

  switch (type) {
    // Without a type there is nothing to fill in: only a text to read.
    case undefined:
      return <Paragraph>{label}</Paragraph>
    case "select":
      return (
        <SelectControl<TaskFormValues>
          name={name}
          label={label}
          options={[{ label: "Maak een keuze", value: "" }, ...selectOptions]}
          registerOptions={{ required: required && "Maak een keuze." }}
          // The dialog has its own heading: the questions are no second one.
          inFieldSet
        />
      )
    case "checkbox":
      return (
        <CheckboxControl<TaskFormValues>
          name={name}
          label={label}
          registerOptions={{ required: required && "Dit is verplicht." }}
        />
      )
    case "multiselect":
      return (
        <CheckboxControlGroup<TaskFormValues>
          name={name}
          label={label}
          options={selectOptions}
          registerOptions={{
            required: required && "Kies ten minste één optie.",
          }}
          inFieldSet
        />
      )
    case "number":
      return (
        <TextInputControl<TaskFormValues>
          name={name}
          label={label}
          // The design system has no number field: a text field with the
          // keyboard for numbers, that only takes a number.
          attributes={{ inputMode: "decimal" }}
          registerOptions={{
            required: required && "Vul een getal in.",
            pattern: { value: NUMBER, message: "Vul een getal in." },
          }}
          inFieldSet
        />
      )
    default:
      return (
        <TextAreaControl<TaskFormValues>
          name={name}
          label={label}
          rows={4}
          registerOptions={{ required: required && "Vul dit veld in." }}
          inFieldSet
        />
      )
  }
}

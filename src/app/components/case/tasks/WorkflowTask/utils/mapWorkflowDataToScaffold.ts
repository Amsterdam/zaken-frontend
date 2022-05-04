import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import { Field } from "app/components/shared/Form/ScaffoldField"

const mapItemToType = (item: any) => {
  if (item.is_date) return "DateField"
  if (item.type === "checkbox") return "Boolean"
  if (item.type === "multiselect") return "CheckboxFields"
  if (item.type === "select") return "ComplexSelectField"
  if (item.type === "number") return "NumberField"
  if (item.camunda_type === "Long") return "NumberField"
  return "TextField"
}

const arrayToObject = (array: Array<{ label: string, value: string }>) => array.reduce(
  (acc, val) => ({ ...acc, [val.value]: val.label }), {} as Record<string, string>
)

const mapItemToOptions = (item: any) => (
  item.type === "checkbox" ? { [item.name]: item.label } : item.type === "multiselect" ? arrayToObject(item.options) : item.options ?? undefined
)

export default (workflowForm: Components.Schemas.CaseUserTaskWorkdflow["form"], onCancel = () => {}) => {

  const fields = workflowForm.reduce((acc: Fields, item: any) => {
    if (item === undefined) return acc
    const mappedItemType = mapItemToType(item)
    // Check for Boolean type to add the checkboxLabel for an aligned single checkbox label.
    const isBoolean = mappedItemType === "Boolean"
    acc[item.name] = {
      type: mappedItemType,
      props: {
        name: item.name,
        label: isBoolean ? "" : item.label,
        checkboxLabel: isBoolean ? item.label : "",
        isRequired: item.required ?? false,
        options: mapItemToOptions(item),
        optionLabelField: "label",
        withEmptyOption: true,
        emptyOptionLabel: "Maak een keuze",
        tooltip: item.tooltip
      }
    } as Field
    return acc
  }, {} as Fields)

  const buttons = {
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
        label: "Taak afronden",
        align: "right"
      }
    }
  }

  const allFields = { ...fields, ...buttons }
  return new FormPositioner(allFields as Fields)
    .setGrid("mobileS", "1fr 1fr", [
      ...Object.keys(fields).map(field => [field, field]),
      ["cancel", "submit"]
    ])
    .getScaffoldProps()
}
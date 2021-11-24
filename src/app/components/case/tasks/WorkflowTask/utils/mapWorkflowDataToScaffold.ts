import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import { Field } from "app/components/shared/Form/ScaffoldField"

const mapItemToType = (item: any) => {
  if (item.is_date) return "DateField"
  if (item.type === "checkbox") return "CheckboxFields"
  if (item.type === "select") return "ComplexSelectField"
  if (item.camunda_type === "Long") return "NumberField"
  return "TextField"
}

const mapItemToOptions = (item: any) => (
  item.type === "checkbox" ? { [item.name]: item.label } : item.options ?? undefined
)

export default (workflowForm: Components.Schemas.CaseUserTask["form"], onCancel = () => {}) => {
  const fields = workflowForm.reduce((acc: Fields, item: any) => {
    if (item === undefined) return acc
    acc[item.name] = {
      type: mapItemToType(item),
      props: {
        name: item.name,
        label: item.type !== "checkbox" ? item.label : undefined,
        isRequired: item.required ?? false,
        options: mapItemToOptions(item),
        optionLabelField: "label",
        withEmptyOption: true,
        emptyOptionLabel: "Maak een keuze",
        validate: (option: any, allValues: any) => {
          const { type } = item
          const isRequiredText = "Dit veld is verplicht"
          if (type === "select" && !option?.value) return isRequiredText
          if (type === "checkbox" && !(option?.length > 0)) return isRequiredText
          if (type === "text" && !option) return isRequiredText
          return ""
        }
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
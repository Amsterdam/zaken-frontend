import { FormPositioner } from "@amsterdam/scaffold-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const mapItemToType = (item: any) => {
  if (item.is_date) return "DateField"
  if (item.type === "checkbox") return "CheckboxFields"
  if (item.type === "select") return "ComplexSelectField"
  if (item.camunda_type === "Long") return "NumberField"
  return "TextField"
}

const mapItemToOptions = (item: any) =>
  item.type === "checkbox" ?
    { true: item.label } :
    item.options ?? undefined

export default (camundaForm: any, onCancel = () => {}) => {
  const fields = camundaForm.reduce((acc: any, item: any) => {
    if (item === undefined) return acc
    acc[item.name] = {
      type: mapItemToType(item),
      props: {
        name: item.name,
        label: item.label,
        isRequired: item.is_required ?? false,
        options: mapItemToOptions(item),
        optionLabelField: "label"
      }
    }
    return acc
  }, {} as any)

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
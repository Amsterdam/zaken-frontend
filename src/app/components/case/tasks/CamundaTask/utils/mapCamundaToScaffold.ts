import { FormPositioner } from "@amsterdam/scaffold-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import { Field } from "app/components/shared/Form/ScaffoldField"

const mapItemToType = (item: Components.Schemas.CamundaTask["form"]["name"]) => {
  if (item.is_date) return "DateField"
  if (item.type === "checkbox") return "CheckboxFields"
  if (item.type === "select") return "ComplexSelectField"
  if (item.camunda_type === "Long") return "NumberField"
  return "TextField"
}

const mapItemToOptions = (item: Components.Schemas.CamundaTask["form"]["name"]) =>
  item.type === "checkbox" ?
    { true: item.label } :
    item.options ?? undefined

export default (camundaForm: Components.Schemas.CamundaTask["form"], onCancel = () => {}) => {
  const fields = camundaForm.reduce((acc: Fields, item: Components.Schemas.CamundaTask["form"]["name"]) => {
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
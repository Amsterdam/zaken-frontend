import { appendTimeToDate } from "app/components/shared/Helpers/helpers"

// type Rec = Record<string, { value: string | number | boolean }>

const castValue = (item: any, value: any) => {
  if (item.type === "select") return value != null ? value.value : null
  if (item.type === "checkbox") return value !== ""
  if (item.camunda_type === "Long") return parseFloat(value)
  if (item.is_date) return appendTimeToDate(value)
  return value
}

export default (form: Components.Schemas.CaseUserTask["form"], data: any) =>
  form.reduce((acc: any, item: any) => {
    const key = item.name
    const value = castValue(item, data[key])
    acc[key] = { value }
    return acc
  }, {})
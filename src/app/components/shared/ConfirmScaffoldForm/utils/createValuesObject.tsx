import moment from "moment"
import ArrayFieldList from "../components/ArrayFieldList"
import type { RequestBody, NamedFields } from "../ConfirmScaffoldFields"
import { Field } from "../../Form/ScaffoldField"
import OptionList from "../components/OptionList"

const mapField = <T extends RequestBody>(field: Field, key: string, data: T) => {
  const { type, props } = field
  const { label = key, name } = props

  if (name === undefined) return
  const v = data[name]
  const mappingTypeResult = data["type_result"] && name.includes("type_result")
  if (v === undefined && !mappingTypeResult) return

  const value = (type: string, props: any) => {
    if (type === "ArrayField") {
      return <ArrayFieldList fields={ v as Array<Record<string, string>> } />
    } else if (type === "ComplexCheckboxFields") {
      return <OptionList fields={ v as Array<Record<string, string>> } />
    } else if (type === "ComplexSelectField" || type === "ComplexRadioFields") {
      return(v as Record<string, string>)[(props as { optionLabelField: string }).optionLabelField]
    } else if (props.hasOwnProperty("options")) {
      return (props as { options: Record<string, unknown> }).options[v as string]
    } else if (name.includes("type_result")) {
      const typeResult: Record<string, string> = data["type_result"] as {}
      return Object.values(typeResult)
    } else if (type === "DateField") {
      return typeof v === "string" ? moment(v).format("DD-MM-YYYY") : v
    } else {
      return v
    }
  }

  return [label, value(type, props) as React.ReactNode] as const
}

export default <T extends RequestBody>(fields: NamedFields<T>, data: T | undefined, showFields: string[]) => {
  if (data === undefined) return {}
  const mappedFields = Object.keys(fields).map(key => {
    const field = fields[key]
    const nestedField = (field.props as { field: Field })?.field
    return nestedField !== undefined ? nestedField : field
  })
  return showFields.reduce((acc, key) => {
    const field = mappedFields.find(field => field.props.name === key)
    if (field === undefined) return acc
    const keyValuePair = mapField<T>(field, key, data)
    if (keyValuePair === undefined) return acc
    const [label, value] = keyValuePair
    acc[label] = value
    return acc
  }, {} as Record<string, React.ReactNode>)
}
import { ReactNode } from "react"
import ArrayFieldList from "../components/ArrayFieldList"
import type { RequestBody, NamedFields } from "../ConfirmScaffoldFields"
import { Field } from "../../Form/ScaffoldField"

const mapField = <T extends RequestBody>(field: Field, key: string, data: T) => {
  const { type, props } = field
  const { label, name } = props

  if (name === undefined) return

  const v = data[name]

  if (v === undefined) return

  const value =
    type === "ArrayField" ?
      <ArrayFieldList fields={ v as Array<Record<string, string>> } /> :
    type === "ComplexSelectField" || type === "ComplexRadioFields" ?
      (v as Record<string, string>)[(props as { optionLabelField: string }).optionLabelField] :
    props.hasOwnProperty("options") ?
      (props as { options: Record<string, unknown> }).options[v as string] :
      v

  return [label ?? key, value as ReactNode] as const
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
  }, {} as Record<string, ReactNode>)
}
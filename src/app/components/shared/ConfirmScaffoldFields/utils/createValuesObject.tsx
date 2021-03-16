import ArrayFieldList from "../ArrayFieldList"
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

  return [label ?? key, value as React.ReactNode] as const
}

export default <T extends RequestBody>(fields: NamedFields<T>, data: T | undefined, showFields: string[]) => {
  if (data === undefined) return {}
  return showFields.reduce((acc, key) => {
    const f = Object.keys(fields).map(field => fields[field]).find(field => field.props.name === key)
    if (f === undefined) return acc
    const field = f.type === "ShowHide" ? f.props.field : f
    const keyValuePair = mapField<T>(field, key, data)
    if (keyValuePair === undefined) return acc
    const [label, value] = keyValuePair
    acc[label] = value
    return acc
  }, {} as Record<string, React.ReactNode>)
}
export type Field = {
  key: string
  label: string
  italic?: boolean
  mapValue?: (v: any) => any
}
type FieldConfig = Pick<Field, "key"> & Partial<Pick<Field, "italic" | "mapValue">>

export default (fields: Array<FieldConfig | string>, translations: Record<string, string>) =>
  fields.map(value => {
    const o = typeof value === "string" ? { key: value } : value
    const label = translations[o.key]
    return { ...o, label }
  })
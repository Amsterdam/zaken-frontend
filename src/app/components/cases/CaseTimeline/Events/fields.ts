export type Field = {
  key: string
  label: string
  type: string
  italic?: boolean
  mapValue?: (v: unknown) => unknown
}
type FieldConfig = Pick<Field, "key"> & Partial<Pick<Field, "type" | "italic">>

export default (fields: Array<FieldConfig | string>, translations: Record<string, string>) =>
  fields.map(value => {
    const o = typeof value === "string" ? { key: value, type: "string" } : value
    const type = o.type ?? "string"
    const label = translations[o.key]
    return { ...o, type, label }
  })
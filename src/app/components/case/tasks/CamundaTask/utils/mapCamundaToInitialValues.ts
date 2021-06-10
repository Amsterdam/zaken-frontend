type Rec = Record<string, boolean | string | { label: string, value: string }>
export default (camundaForm: Components.Schemas.CamundaTask["form"]) =>
  camundaForm.reduce((acc: Rec, item: Components.Schemas.CamundaTask["form"]["name"]) => {
    const { default_value, label, name, type, options } = item
    // The API response is somewhat inconsistent
    // default_value == "false" means checked
    // default_value == "" means unchecked
    if (type === "checkbox" && default_value === "false") {
      acc[name] = true
      return acc
    }
    if (type === "select") {
      acc[name] = { label, value: default_value ?? options[0].value }
      return acc
    }
    if (default_value == null) return acc
    acc[name] = default_value
    return acc
  }, {} as Rec)
type Rec = Record<string, string | { name: string } | { label: string, value: string }>
export default (camundaForm: Components.Schemas.CamundaTask["form"]) =>
  camundaForm.reduce((acc: Rec, item: Components.Schemas.CamundaTask["form"]["name"]) => {
    const { default_value, label, name, type, options } = item
    if (type === "checkbox" && default_value === "true") {
      acc[name] = { name }
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
export default (camundaForm: Components.Schemas.CamundaTask["form"]) =>
  camundaForm.reduce((acc: Record<string, string>, item: Components.Schemas.CamundaTask["form"]["name"]) => {
    const { default_value, name, type } = item
    if (type === "checkbox" && default_value === "true") {
      acc[name] = default_value
      return acc
    }
    if (type === "select") {
      acc[name] = "0"
      return acc
    }
    if (default_value == null) return acc
    acc[name] = default_value
    return acc
  }, {} as Record<string, string>)
type Rec = Record<string, Array<string> | string | { label: string, value: string }>
export default (workflowForm: Components.Schemas.CaseUserTask["form"]) =>
  workflowForm.reduce((acc: Rec, item: any) => {
    const { default_value, label, name, type, options } = item
    // The API response is somewhat inconsistent
    // default_value == "false" means checked
    // default_value == "" means unchecked
    if (type === "checkbox") {
      if (default_value === "false") acc[name] = [name]
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
type Rec = Record<string, Array<string> | string | { label: string, value: string }>
export default (workflowForm: Components.Schemas.CaseUserTaskWorkdflow["form"]) => (
  workflowForm.reduce((acc: Rec, item: any) => {
    const { default_value, label, name, type } = item
    // The API response is somewhat inconsistent
    // default_value == "false" means checked
    // default_value == "" means unchecked
    if (type === "checkbox") {
      if (default_value === "false") acc[name] = [name]
      return acc
    }
    if (type === "select") {
      acc[name] = { label, value: "" } // Don't set default action, force user to make a decision.
      return acc
    }
    if (default_value == null) return acc
    acc[name] = default_value
    return acc
  }, {} as Rec)
)
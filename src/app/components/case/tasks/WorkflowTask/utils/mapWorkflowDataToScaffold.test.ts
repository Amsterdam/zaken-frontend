import mapWorkflowDataToScaffold from "./mapWorkflowDataToScaffold"
import mock from "./workflowData.mock"

describe("mapWorkflowDataToScaffold", () => {
  it("fields", () => {
    const scaffold = mapWorkflowDataToScaffold(mock)
    expect(Object.keys(scaffold.fields)).toEqual([
      "situation",
      "can_next_visit_go_ahead",
      "FormField_3qjm0em",
      "FormField_3vj52a2",
      "FormField_0cgfa15",
      "cancel",
      "submit"
    ])
    const values = Object.values(scaffold.fields) as any
    expect(values[1].type).toBe("Boolean")
    expect(values[2].type).toBe("ComplexSelectField")
    expect(values[3].type).toBe("DateField")
  })
})
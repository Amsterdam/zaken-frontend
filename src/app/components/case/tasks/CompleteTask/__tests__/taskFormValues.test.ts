import { getDefaultValues, toVariables } from "../taskFormValues"

const fields: Tasks.FormField[] = [
  { label: "Wat is de situatie?", name: "situation", type: "text" },
  { label: "Kan het bezoek doorgaan?", name: "go_ahead", type: "checkbox" },
  {
    label: "Wat is de uitkomst?",
    name: "outcome",
    type: "select",
    options: [{ label: "Ja", value: "yes" }],
  },
  { label: "Hoeveel?", name: "amount", type: "number" },
  {
    label: "Welke besluiten?",
    name: "decisions",
    type: "multiselect",
    options: [{ label: "Boete", value: 4 }],
  },
  { label: "Er zijn geen besluiten.", name: "none" },
]

describe("the values of the form of a task", () => {
  it("starts empty", () => {
    expect(getDefaultValues(fields)).toEqual({
      situation: "",
      go_ahead: false,
      outcome: "",
      amount: "",
      decisions: [],
      none: "",
    })
  })

  it("sends what is filled in, each as its own kind", () => {
    expect(
      toVariables(fields, {
        situation: "Niemand thuis",
        go_ahead: true,
        outcome: "yes",
        amount: "12,5",
        decisions: ["4"],
        none: "",
      }),
    ).toEqual({
      situation: { value: "Niemand thuis" },
      go_ahead: { value: true },
      outcome: { value: "yes" },
      amount: { value: 12.5 },
      decisions: { value: ["4"] },
    })
  })

  it("leaves out what is empty, but a checkbox is always there", () => {
    expect(toVariables(fields, getDefaultValues(fields))).toEqual({
      go_ahead: { value: false },
      decisions: { value: [] },
    })
  })
})

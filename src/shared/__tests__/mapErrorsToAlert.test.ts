import { type FieldErrors } from "react-hook-form"
import { mapErrorsToAlert } from "../mapErrorsToAlert"

const errors = {
  reason: { type: "required", message: "Kies een reden." },
  description: { type: "required", message: "Vul een toelichting in." },
} as FieldErrors

describe("mapErrorsToAlert", () => {
  afterEach(() => {
    document.head.innerHTML = ""
    document.body.innerHTML = ""
  })

  it("links every error to its field: of radio buttons the first one", () => {
    document.body.innerHTML = `
      <form>
        <input type="radio" name="reason" id="reason-0" />
        <input type="radio" name="reason" id="reason-1" />
        <textarea name="description" id="description"></textarea>
      </form>`

    expect(mapErrorsToAlert(errors)).toEqual([
      { id: "#reason-0", label: "Kies een reden." },
      { id: "#description", label: "Vul een toelichting in." },
    ])
  })

  it("only looks at the fields of a form, not at e.g. a meta tag", () => {
    // Like index.html: an element with the name of a field, that is no field.
    document.head.innerHTML = `<meta name="description" content="AZA" />`
    document.body.innerHTML = `
      <form><textarea name="description" id="description"></textarea></form>`

    expect(mapErrorsToAlert({ description: errors.description })).toEqual([
      { id: "#description", label: "Vul een toelichting in." },
    ])
  })
})

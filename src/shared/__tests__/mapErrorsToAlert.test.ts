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

  it("finds the fields of a list and of a group", () => {
    document.body.innerHTML = `
      <form>
        <input name="persons.1.first_name" id="persons.1.first_name" />
        <input name="legal_person.last_name" id="legal_person.last_name" />
      </form>`

    expect(
      mapErrorsToAlert({
        // The first person is fine: the list has a hole there.
        persons: [
          undefined,
          { first_name: { type: "required", message: "Vul de voornaam in." } },
        ],
        legal_person: {
          last_name: { type: "required", message: "Vul de achternaam in." },
        },
      } as unknown as FieldErrors),
    ).toEqual([
      { id: "#persons.1.first_name", label: "Vul de voornaam in." },
      { id: "#legal_person.last_name", label: "Vul de achternaam in." },
    ])
  })

  it("finds a field without a name by its id", () => {
    // The input of a searchable select list has an id but no name.
    document.body.innerHTML = `<form><input id="subjects" /></form>`

    expect(
      mapErrorsToAlert({
        subjects: { type: "validate", message: "Kies een onderwerp." },
      } as FieldErrors),
    ).toEqual([{ id: "#subjects", label: "Kies een onderwerp." }])
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

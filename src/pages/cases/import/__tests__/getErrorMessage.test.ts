import { getErrorMessage } from "../getErrorMessage"

const apiError = (body: Record<string, unknown>) => ({
  status: 400,
  message: "Bad Request",
  url: "https://api.test/cases/process-file/",
  ...body,
})

describe("getErrorMessage", () => {
  it("gives the error about the file", () => {
    expect(
      getErrorMessage(
        apiError({ error: "Bestand moet de volgende kolom bevatten: straat" }),
      ),
    ).toBe("Bestand moet de volgende kolom bevatten: straat")
  })

  it("gives the detail", () => {
    expect(getErrorMessage(apiError({ detail: "Niet gevonden." }))).toBe(
      "Niet gevonden.",
    )
  })

  it("gives the errors of the fields of the request", () => {
    expect(
      getErrorMessage(
        apiError({
          reason_id: ["This reason cannot be used to import cases."],
          jump_to: ["This step is not possible for the theme of the case."],
        }),
      ),
    ).toBe(
      "This reason cannot be used to import cases. This step is not possible for the theme of the case.",
    )
  })

  it("says to try again for anything else", () => {
    expect(getErrorMessage(apiError({}))).toBe("Probeer het later opnieuw.")
    expect(getErrorMessage(new TypeError("Failed to fetch"))).toBe(
      "Probeer het later opnieuw.",
    )
  })
})

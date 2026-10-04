import { mapApiErrorToToast } from "@/api/utils/mapApiErrorToToast"

describe("mapApiErrorToToast", () => {
  it("says you have no access for a 403", () => {
    expect(mapApiErrorToToast({ status: 403, message: "Forbidden" })).toEqual(
      expect.objectContaining({
        title: "Toegang geweigerd!",
        severity: "error",
      }),
    )
  })

  it("says it is not found for a 404", () => {
    expect(
      mapApiErrorToToast({ status: 404, message: "Not Found" }).title,
    ).toBe("Niet gevonden!")
  })

  it("has one text for every other error, without the url or the message", () => {
    const toast = mapApiErrorToToast({
      status: 500,
      message: "Internal Server Error",
      url: "https://api.test/themes/",
    })

    expect(toast.title).toBe("Oeps, iets ging mis!")
    expect(toast.description).not.toContain("api.test")
    expect(toast.description).not.toContain("Internal Server Error")
  })
})

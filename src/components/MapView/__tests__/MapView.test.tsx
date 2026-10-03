import { render, screen } from "@testing-library/react"
import { MapView } from "../MapView"

describe("MapView", () => {
  it("shows a map with a marker on the place", () => {
    const { unmount } = render(
      <MapView
        latitude={52.3566403}
        longitude={4.8293878}
        label="Pieter Calandlaan 30-H"
      />,
    )

    expect(
      screen.getByRole("region", { name: "Kaart van Pieter Calandlaan 30-H" }),
    ).toBeTruthy()
    expect(screen.getByAltText("Pieter Calandlaan 30-H")).toBeTruthy()

    // Leaves nothing behind.
    unmount()
    expect(document.querySelector(".leaflet-container")).toBeNull()
  })
})

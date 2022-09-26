import { render, screen, fireEvent } from "@testing-library/react"
import DistrictsFilter from "./DistrictsFilter"

const mockedDistricts = [
  { id: 1, name: "Alpha" },
  { id: 2, name: "Bravo" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Delta" },
  { id: 5, name: "Echo" },
  { id: 6, name: "Foxtrot" }
]

const mockedSetDistrictNames = jest.fn()

test("has correct district values", () => {
  const { queryByText } = render(
    <DistrictsFilter
      districts={ mockedDistricts }
      districtNames={ [] }
      setDistrictNames={ mockedSetDistrictNames }
    />
  )

  for (let i = 0; i < mockedDistricts.length; i++) {
    expect(queryByText(mockedDistricts[i].name)).toBeInTheDocument()
  }
})

test("onChange is called and checkbox is checked", () => {
  const testDistrictName = mockedDistricts[0].name
  const { rerender } = render(
    <DistrictsFilter
      districts={ mockedDistricts }
      districtNames={ [] }
      setDistrictNames={ mockedSetDistrictNames }
    />
  )

  const checkbox = screen.getByTestId(testDistrictName)
  expect(checkbox).not.toBeChecked()

  fireEvent.click(checkbox)

  expect(mockedSetDistrictNames).toHaveBeenCalledTimes(1)

  // re-render the same component with different props
  rerender(
    <DistrictsFilter
      districts={ mockedDistricts }
      districtNames={ [testDistrictName] }
      setDistrictNames={ mockedSetDistrictNames }
    />
  )
  // testDistrictName is set as prop so checkbox must be checked.
  expect(screen.getByTestId(testDistrictName)).toBeChecked()

})

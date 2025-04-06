import { render, screen, fireEvent } from "@testing-library/react"
import MultipleOptionsFilter from "./MultipleOptionsFilter"

const mockedOptions = [
  { id: 1, name: "Alpha" },
  { id: 2, name: "Bravo" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Delta" },
  { id: 5, name: "Echo" },
  { id: 6, name: "Foxtrot" }
]

const mockedSetDistrictNames = vi.fn()

test("has correct option values", () => {
  const { queryByText } = render(
    <MultipleOptionsFilter
      label="test"
      options={mockedOptions}
      selectedOptions={[]}
      setSelectedOptions={mockedSetDistrictNames}
    />
  )

  for (let i = 0; i < mockedOptions.length; i++) {
    const option = queryByText(mockedOptions[i].name)
    expect(option).toBeTruthy()
  }
})

test("checkboxes are checked", () => {
  const LENGTH_ARR_1 = 3
  const ARR_1 = mockedOptions.slice(0, LENGTH_ARR_1)
  const ARR_2 = mockedOptions.slice(LENGTH_ARR_1, mockedOptions.length)

  render(
    <MultipleOptionsFilter
      label="test"
      options={mockedOptions}
      selectedOptions={ARR_1.map((item) => item.name)}
      setSelectedOptions={mockedSetDistrictNames}
    />
  )

  // checkboxes in the first array are checked
  for (let i = 0; i < ARR_1.length; i++) {
    const checkbox = screen.getByTestId(ARR_1[i].name) as HTMLInputElement
    expect(checkbox.checked).toBeTruthy() // Checks that the checkbox is checked
  }

  // checkboxes in the second array are NOT checked
  for (let i = 0; i < ARR_2.length; i++) {
    const checkbox = screen.getByTestId(ARR_2[i].name) as HTMLInputElement
    expect(checkbox.checked).toBeFalsy() // Checks that the checkbox is not checked
  }
})

test("label is set and changed", () => {
  const LABEL_1 = "test 1"
  const LABEL_2 = "test 2"

  const { rerender, queryByText } = render(
    <MultipleOptionsFilter
      label={LABEL_1}
      options={mockedOptions}
      selectedOptions={[]}
      setSelectedOptions={mockedSetDistrictNames}
    />
  )
  expect(queryByText(LABEL_1)).toBeTruthy()

  rerender(
    <MultipleOptionsFilter
      label={LABEL_2}
      options={mockedOptions}
      selectedOptions={[]}
      setSelectedOptions={mockedSetDistrictNames}
    />
  )
  expect(queryByText(LABEL_2)).toBeTruthy()

})

test("onChange is called and checkbox is checked", () => {
  const testOptionName = mockedOptions[0].name
  const { rerender } = render(
    <MultipleOptionsFilter
      label="test"
      options={mockedOptions}
      selectedOptions={[]}
      setSelectedOptions={mockedSetDistrictNames}
    />
  )

  const checkbox = screen.getByTestId(testOptionName) as HTMLInputElement
  expect(checkbox.checked).toBeFalsy()

  fireEvent.click(checkbox)

  expect(mockedSetDistrictNames).toHaveBeenCalledTimes(1)

  // re-render the same component with different props
  rerender(
    <MultipleOptionsFilter
      label="test"
      options={mockedOptions}
      selectedOptions={[testOptionName]}
      setSelectedOptions={mockedSetDistrictNames}
    />
  )
  // testOptionName is set as prop so checkbox must be checked.
  expect(checkbox.checked).toBeTruthy()

})

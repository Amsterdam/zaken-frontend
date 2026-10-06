import { fireEvent, render, screen } from "@testing-library/react"
import CasesSorting from "../CasesSorting"

describe("CasesSorting", () => {
  it("shows the current order and tells which one you choose", () => {
    const onChange = vi.fn()
    render(
      <CasesSorting
        sorting={{ dataIndex: "start_date", order: "DESCEND" }}
        onChange={onChange}
      />,
    )

    const select = screen.getByLabelText<HTMLSelectElement>("Sorteren op")
    expect(select.selectedOptions[0].textContent).toBe("Startdatum nieuw-oud")

    fireEvent.change(select, {
      target: { value: "address.street_name:ASCEND" },
    })

    expect(onChange).toHaveBeenCalledWith({
      dataIndex: "address.street_name",
      order: "ASCEND",
    })
  })
})

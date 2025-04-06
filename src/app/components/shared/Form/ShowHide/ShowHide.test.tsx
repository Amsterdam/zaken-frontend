import { render, fireEvent } from "@testing-library/react"
import { Form } from "react-final-form"
import { FormState } from "final-form"
import ShowHide from "./ShowHide"

describe("ShowHide", () => {
  const renderFields = (shouldShow: (obj: FormState<any>) => boolean) => (
    <Form
      onSubmit={vi.fn()}
      render={({ form }) => (
        <ShowHide
          shouldShow={shouldShow}
          field={{ type: "TextField", props: { label: "Foo", name: "foo" } }}
        />
      )}
    />
  )

  it("should render component when shouldShow function returns true", () => {
    const { getByLabelText } = render(renderFields(() => true))
    const element = getByLabelText("Foo")
    expect(element).toBeTruthy() // Checks that the element is present in the DOM
  })

  it("should NOT render component when shouldShow function returns false", () => {
    const { queryByLabelText } = render(renderFields(() => false))
    const element = queryByLabelText("Foo")
    expect(element).toBeNull() // Checks that the element is not in the DOM
  })

  it("should call the shouldShow method with updated values", () => {
    const shouldShow = vi.fn(() => true)
    const { getByLabelText } = render(renderFields(shouldShow))

    fireEvent.change(getByLabelText("Foo"), { target: { value: "changed" } })

    expect(shouldShow).lastCalledWith(expect.objectContaining({
      values: { foo: "changed" }
    }))
  })
})

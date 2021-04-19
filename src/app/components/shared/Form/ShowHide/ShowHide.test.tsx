import { mount } from "enzyme"
import { Form } from "react-final-form"
import { FormState } from "final-form"

import ShowHide from "./ShowHide"

describe("ShowHide", () => {
  const renderFields = (shouldShow: (obj: FormState<any>) => boolean) => mount(
    <Form
      onSubmit={ jest.fn() }
      render={ () => (
        <ShowHide
          shouldShow={ shouldShow }
          field={ { type: "TextField", props: { label: "Foo", name: "foo" } } }
        />
      ) }
    />
  )

  it("should render component when shouldShow function returns true", () => {
    const component = renderFields(() => true)
    expect(component.find("input").exists()).toEqual(true)
  })

  it("should NOT render component when shouldShow function returns false", () => {
    const component = renderFields(() => false)
    expect(component.find("input").exists()).toEqual(false)
  })

  it("should call the shouldShow method with updated values", () => {
    const shouldShow = jest.fn(() => true)
    const component = renderFields(shouldShow)

    component.find("input").simulate("change", { target: { value: "changed" } })

    expect(shouldShow).lastCalledWith(expect.objectContaining({
      values: { foo: "changed" }
    }))
  })
})

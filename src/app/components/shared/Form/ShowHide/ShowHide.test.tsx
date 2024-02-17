import { render, fireEvent } from "@testing-library/react";
import { Form } from "react-final-form";
import { FormState } from "final-form";
import ShowHide from "./ShowHide";

describe("ShowHide", () => {
  const renderFields = (shouldShow: (obj: FormState<any>) => boolean) => (
    <Form
      onSubmit={jest.fn()}
      render={({ form }) => (
        <ShowHide
          shouldShow={shouldShow}
          field={{ type: "TextField", props: { label: "Foo", name: "foo" } }}
        />
      )}
    />
  );

  it("should render component when shouldShow function returns true", () => {
    const { getByLabelText } = render(renderFields(() => true));
    expect(getByLabelText("Foo")).toBeInTheDocument();
  });

  it("should NOT render component when shouldShow function returns false", () => {
    const { queryByLabelText } = render(renderFields(() => false));
    expect(queryByLabelText("Foo")).not.toBeInTheDocument();
  });

  it("should call the shouldShow method with updated values", () => {
    const shouldShow = jest.fn(() => true);
    const { getByLabelText } = render(renderFields(shouldShow));

    fireEvent.change(getByLabelText("Foo"), { target: { value: "changed" } });

    expect(shouldShow).lastCalledWith(expect.objectContaining({
      values: { foo: "changed" }
    }));
  });
});

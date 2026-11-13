import "@/router/routes"
import { render, screen } from "@testing-library/react"
import { useForm } from "react-hook-form"
import { MemoryRouter } from "react-router"
import { FormPage } from "../FormPage"

vi.mock("@/api/hooks", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useUsersMe: () => ({ data: { permissions: [] } }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

const Page = () => {
  const form = useForm()
  return (
    <FormPage
      title="Resultaat besluit"
      form={form}
      onSubmit={vi.fn()}
      submitText="Opslaan"
      onCancel={vi.fn()}
    >
      <p>Velden</p>
    </FormPage>
  )
}

describe("FormPage", () => {
  it("shows the breadcrumbs once, in the cell of the title", () => {
    render(
      <MemoryRouter initialEntries={["/zaken/12/besluit/34"]}>
        <Page />
      </MemoryRouter>,
    )

    const breadcrumbs = screen.getAllByRole("navigation", {
      name: "Kruimelpad",
    })
    expect(breadcrumbs).toHaveLength(1)
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Resultaat besluit",
    })
    expect(heading.parentElement).toBe(breadcrumbs[0].parentElement)
  })
})

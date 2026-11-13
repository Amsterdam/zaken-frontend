import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router"
import ImportTemplatePage from "../template/ImportTemplatePage"
import type { ReactNode } from "react"

vi.mock("@/api/hooks", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useUsersMe: () => ({ data: { permissions: [] } }),
  useCaseThemes: () => ({
    data: {
      results: [
        { id: 1, name: "Vakantieverhuur" },
        { id: 2, name: "Ondermijning" },
      ],
    },
  }),
  useReasons: () => ({
    data: {
      results: [
        { id: 11, name: "Digitaal toezicht" },
        { id: 12, name: "Project" },
      ],
    },
  }),
  useProjects: () => ({
    data: {
      results: [{ id: 21, name: "Project A" }],
    },
  }),
  useSubjects: () => ({
    data: {
      results: [{ id: 31, name: "Onderwerp A" }],
    },
  }),
  useAllowedJumpWorkflows: () => ({
    data: [
      { value: "summon", label: "Aanschrijving" },
      { value: "unoccupied", label: "Leegstand" },
      { value: "debrief", label: "Debrief" },
    ],
  }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("@/components/FormPage/FormPage", () => ({
  FormPage: ({
    children,
    intro,
    onSubmit,
    submitText,
  }: {
    children: ReactNode
    intro?: ReactNode
    onSubmit: (values: {
      theme: string
      reason: string
      project: string
      subjects: string[]
      jump_to: string
    }) => void
    submitText: string
  }) => (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          theme: "1",
          reason: "11",
          project: "",
          subjects: ["31"],
          jump_to: "debrief",
        })
      }}
    >
      {intro}
      {children}
      <button type="submit">{submitText}</button>
    </form>
  ),
}))

vi.mock("@amsterdam/ee-ads-rhf", () => ({
  RadioControl: () => <div />,
  SelectControl: () => <div />,
  CheckboxControlGroup: () => <div />,
}))

const Location = () => {
  const { pathname, state } = useLocation()
  const templateCase =
    (state as { templateCase?: { themeId?: number; jumpTo?: string | null } } | null)
    ?.templateCase
  return <output>{pathname}|{templateCase?.themeId ?? ""}|{templateCase?.jumpTo ?? ""}</output>
}

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/zaken/importeren"]}>
      <ImportTemplatePage />
      <Location />
    </MemoryRouter>,
  )

describe("ImportTemplatePage", () => {
  it("goes to checking the file with the chosen case data", () => {
    renderPage()

    fireEvent.click(
      screen.getByRole("button", { name: "Naar bestand controleren" }),
    )

    expect(screen.getByRole("status").textContent).toBe(
      "/zaken/importeren/controleren|1|debrief",
    )
  })

  it("shows the requested textual step indicator", () => {
    renderPage()

    expect(
      screen.getByText("1. Soort zaak kiezen → 2. Bestand controleren → 3. Resultaat"),
    ).toBeTruthy()
  })
})









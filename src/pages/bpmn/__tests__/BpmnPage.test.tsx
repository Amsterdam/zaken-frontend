// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "@/router/routes"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router"
import BpmnPage from "../BpmnPage"

const useBpmnFile = vi.fn((model?: string, version?: string) => ({
  data: `<xml ${model} ${version} />`,
  isLoading: false,
}))

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
  useBpmnModelNames: () => ({
    data: ["director", "sub_workflow"],
    isLoading: false,
  }),
  useBpmnModels: (model?: string) => ({
    data:
      model === undefined
        ? undefined
        : ["0.1.0", "0.2.0", "0.10.0"].map((version) => ({
            version,
            model,
            file_name: `${model}.bpmn`,
          })),
    isLoading: false,
  }),
  useBpmnFile: (model?: string, version?: string) =>
    useBpmnFile(model, version),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("@/hooks/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

// bpmn-js draws SVG, which jsdom can't measure.
vi.mock("@/components/bpmn/BpmnDiagramViewer", () => ({
  default: ({
    xml,
    currentTaskSpecs,
  }: {
    xml: string
    currentTaskSpecs?: string[]
  }) => (
    <div data-testid="diagram" data-tasks={currentTaskSpecs?.join("|")}>
      {xml}
    </div>
  ),
}))

const Location = () => (
  <output data-testid="search">{useLocation().search}</output>
)
const search = () => screen.getByTestId("search").textContent

const renderPage = (url = "/bpmn") =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <BpmnPage />
      <Location />
    </MemoryRouter>,
  )

describe("BpmnPage", () => {
  beforeEach(() => {
    useBpmnFile.mockClear()
  })

  it("asks for a model first", () => {
    renderPage()

    expect(screen.getByRole("heading", { level: 1, name: "BPMN" })).toBeTruthy()
    expect(
      screen.getAllByRole("option").map((option) => option.textContent),
    ).toEqual(["Selecteer naam", "Director", "Sub workflow"])
    expect(screen.queryByLabelText("Versie")).toBeNull()
    expect(screen.queryByTestId("diagram")).toBeNull()
  })

  it("shows the latest version of the chosen model", async () => {
    renderPage()

    fireEvent.change(screen.getByLabelText("Naam"), {
      target: { value: "sub_workflow" },
    })

    expect(search()).toBe("?model=sub_workflow")
    expect(screen.getByLabelText<HTMLSelectElement>("Versie").value).toBe(
      "0.10.0",
    )
    expect((await screen.findByTestId("diagram")).textContent).toBe(
      "<xml sub_workflow 0.10.0 />",
    )
  })

  it("shows the chosen version, and keeps the choice in the URL", async () => {
    renderPage("/bpmn?model=director")

    fireEvent.change(screen.getByLabelText("Versie"), {
      target: { value: "0.1.0" },
    })

    expect(search()).toBe("?model=director&versie=0.1.0")
    expect((await screen.findByTestId("diagram")).textContent).toBe(
      "<xml director 0.1.0 />",
    )
  })

  it("passes the tasks of the URL on to highlight them", async () => {
    renderPage("/bpmn?model=director&versie=0.2.0&taken=task_a,task_b")

    expect(
      (await screen.findByTestId("diagram")).getAttribute("data-tasks"),
    ).toBe("task_a|task_b")
  })
})

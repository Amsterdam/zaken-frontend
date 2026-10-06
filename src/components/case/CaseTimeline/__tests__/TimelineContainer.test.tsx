import { render, screen } from "@testing-library/react"
import TimelineContainer from "../TimelineContainer"

type Query = { data?: unknown[]; isError: boolean }
let query: Query

vi.mock("@/api/hooks", () => ({
  useCaseEvents: () => query,
}))

const event = (id: number, type: string, values: object = {}) => ({
  id,
  type,
  case: 12,
  date_created: `2026-10-0${id}T10:00:00Z`,
  event_values: values,
  event_variables: {},
})

// The step's status ("Bezig: ", "Klaar: ") is in front of its title for a
// screen reader.
const steps = () =>
  screen
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent?.replace(/^(Bezig|Klaar): /, ""))

describe("the history of a case", () => {
  beforeEach(() => {
    query = {
      isError: false,
      data: [
        event(1, "CASE", { reason: "Melding" }),
        event(2, "SCHEDULE"),
        event(3, "VISIT"),
        event(4, "DEBRIEFING"),
        event(5, "SUMMON"),
      ],
    }
  })

  it("shows all events, the latest first and only that one open", () => {
    render(<TimelineContainer caseId={12} />)

    expect(steps()).toEqual([
      "Aanschrijving",
      "Debrief",
      "Bezoek",
      "Bezoek ingepland",
      "Aanleiding",
    ])
    // Every event has a button to open and close it.
    expect(
      screen
        .getAllByRole("button")
        .map((button) => button.getAttribute("aria-expanded")),
    ).toEqual(["true", "false", "false", "false", "false"])
  })

  it("says so when there is no history, and when it failed", () => {
    query = { isError: false, data: [] }
    const { unmount } = render(<TimelineContainer caseId={12} />)
    expect(screen.getByText("Er is nog geen zaakhistorie.")).toBeTruthy()
    unmount()

    query = { isError: true }
    render(<TimelineContainer caseId={12} />)
    expect(
      screen.getByText("De zaakhistorie kon niet worden opgehaald."),
    ).toBeTruthy()
  })
})

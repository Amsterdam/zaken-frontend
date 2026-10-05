// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "@/router/routes"
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import CreatePage from "../CreatePage"

const createSummon = vi.fn()

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: ["perform_task"] } }),
  useCase: () => ({
    data: {
      id: 12,
      theme: { id: 1, name: "Vakantieverhuur" },
      address: {
        street_name: "Amstel",
        number: 1,
        suffix_letter: null,
        suffix: "H",
        postal_code: "1011PN",
      },
    },
    isLoading: false,
  }),
  useSummonTypesByTaskId: () => ({
    data: {
      results: [
        { id: 2, name: "Voornemen boete", workflow_option: "voornemen" },
        { id: 3, name: "Sluiting", workflow_option: "sluiting" },
      ],
    },
  }),
  useCreateSummon: () => ({ mutateAsync: createSummon, isPending: false }),
}))

vi.mock("@/hooks/useHasPermission", () => ({ default: () => [true, false] }))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("@/app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const Location = () => <output>{useLocation().pathname}</output>

const renderPage = () => {
  // The breadcrumbs read the path from window.location.
  window.history.pushState({}, "", "/zaken/12/aanschrijving/34")
  return render(
    <MemoryRouter initialEntries={["/zaken/12/aanschrijving/34"]}>
      <ToastProvider>
        <Routes>
          <Route
            path="/zaken/:id/aanschrijving/:caseUserTaskId"
            element={<CreatePage />}
          />
          <Route path="*" element={null} />
        </Routes>
        <Location />
      </ToastProvider>
    </MemoryRouter>,
  )
}

const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: "Resultaat verwerken" }))
const location = () => screen.getByText(/^\/zaken/, { selector: "output" })
const chooseType = (value: string) =>
  fireEvent.change(screen.getByLabelText(/^Welke aanschrijving is opgesteld/), {
    target: { value },
  })
const person = (number: number) =>
  within(screen.getByRole("group", { name: `Aangeschreven persoon ${number}` }))
const type = (field: HTMLElement, value: string) =>
  fireEvent.change(field, { target: { value } })
const fillPerson = (
  number: number,
  firstName: string,
  lastName: string,
  role: string,
) => {
  type(person(number).getByLabelText(/^Voornaam/), firstName)
  type(person(number).getByLabelText(/^Achternaam/), lastName)
  type(person(number).getByLabelText(/^Rol/), role)
}

describe("the page to process a summon", () => {
  beforeEach(() => {
    createSummon.mockReset().mockResolvedValue({})
  })

  it("asks which summon, and to whom, before anything about persons", () => {
    renderPage()

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Resultaat aanschrijving",
      }),
    ).toBeTruthy()
    expect(
      screen.queryByRole("group", { name: /^Aangeschreven persoon/ }),
    ).toBeNull()
    expect(screen.queryByLabelText(/^Aangeschreven rechtspersoon/)).toBeNull()
    // Only for a summon that closes accommodations.
    expect(
      screen.queryByLabelText(/^Aantal gesloten logiesverblijven/),
    ).toBeNull()
  })

  it("lists what is wrong, also in the fields of a person", async () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Natuurlijk persoon"))
    submit()

    expect(
      await screen.findByRole("link", { name: "Kies een aanschrijving." }),
    ).toBeTruthy()
    const link = screen.getByRole("link", {
      name: "Vul de voornaam van persoon 1 in.",
    })
    // The link goes to the field of that person.
    expect(link.getAttribute("href")).toBe(
      `#${person(1).getByLabelText(/^Voornaam/).id}`,
    )
    expect(
      screen.getByRole("link", { name: "Kies de rol van persoon 1." }),
    ).toBeTruthy()
    expect(createSummon).not.toHaveBeenCalled()
  })

  it("saves a summon to two natural persons", async () => {
    renderPage()
    chooseType("2")
    fireEvent.click(screen.getByLabelText("Natuurlijk persoon"))
    fillPerson(1, "Jan", "Vries", "PERSON_ROLE_OWNER")
    type(person(1).getByLabelText(/^Tussenvoegsel/), "de")

    fireEvent.click(screen.getByRole("button", { name: "Persoon toevoegen" }))
    fillPerson(2, "Piet", "Jansen", "PERSON_ROLE_RESIDENT")
    // Two is the most.
    expect(
      screen.queryByRole("button", { name: "Persoon toevoegen" }),
    ).toBeNull()
    submit()

    await waitFor(() =>
      expect(createSummon).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        type: 2,
        persons: [
          {
            first_name: "Jan",
            preposition: "de",
            last_name: "Vries",
            person_role: "PERSON_ROLE_OWNER",
          },
          {
            first_name: "Piet",
            last_name: "Jansen",
            person_role: "PERSON_ROLE_RESIDENT",
          },
        ],
      }),
    )
    await waitFor(() => expect(location().textContent).toBe("/zaken/12"))
    expect(screen.getByText("Het resultaat is verwerkt.")).toBeTruthy()
  })

  it("can take the second person away again", () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Natuurlijk persoon"))
    // One person can't be removed.
    expect(screen.queryByRole("button", { name: /verwijderen$/ })).toBeNull()

    fireEvent.click(screen.getByRole("button", { name: "Persoon toevoegen" }))
    fillPerson(2, "Piet", "Jansen", "PERSON_ROLE_RESIDENT")
    fireEvent.click(
      screen.getByRole("button", { name: "Persoon 1 verwijderen" }),
    )

    // The one that is left is the first now, with what was filled in.
    expect(
      screen.queryByRole("group", { name: "Aangeschreven persoon 2" }),
    ).toBeNull()
    expect(person(1).getByLabelText<HTMLInputElement>(/^Voornaam/).value).toBe(
      "Piet",
    )
  })

  it("saves a summon to the board of a legal entity", async () => {
    renderPage()
    chooseType("2")
    fireEvent.click(screen.getByLabelText("Rechtspersoon"))
    type(screen.getByLabelText(/^Aangeschreven rechtspersoon/), "Verhuur BV")
    type(screen.getByLabelText(/^Rol/), "PERSON_ROLE_LANDLORD")
    fireEvent.click(screen.getByLabelText("Aan bestuur"))
    type(screen.getByLabelText(/^Korte toelichting/), "Per post verstuurd.")
    submit()

    await waitFor(() =>
      expect(createSummon).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        type: 2,
        persons: [
          {
            person_role: "PERSON_ROLE_LANDLORD",
            entity_name: "Verhuur BV",
            function: "Bestuur",
          },
        ],
        description: "Per post verstuurd.",
      }),
    )
  })

  it("saves a summon to a person of a legal entity, with the number of closed accommodations", async () => {
    renderPage()
    chooseType("3")
    type(screen.getByLabelText(/^Aantal gesloten logiesverblijven/), "2")
    fireEvent.click(screen.getByLabelText("Rechtspersoon"))
    type(screen.getByLabelText(/^Aangeschreven rechtspersoon/), "Verhuur BV")
    type(screen.getByLabelText(/^Rol/), "PERSON_ROLE_OWNER")
    fireEvent.click(screen.getByLabelText("Aan persoon"))
    submit()

    // The person is required now.
    expect(
      await screen.findByRole("link", { name: "Vul de voornaam in." }),
    ).toBeTruthy()
    const addressee = within(
      screen.getByRole("group", { name: "Aangeschreven persoon" }),
    )
    type(addressee.getByLabelText(/^Voornaam/), "Jan")
    type(addressee.getByLabelText(/^Achternaam/), "Vries")
    submit()

    await waitFor(() =>
      expect(createSummon).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        type: 3,
        persons: [
          {
            first_name: "Jan",
            last_name: "Vries",
            person_role: "PERSON_ROLE_OWNER",
            entity_name: "Verhuur BV",
          },
        ],
        type_result: { number_of_accommodations: 2 },
      }),
    )
  })

  it("explains what to do with more than one summon", () => {
    renderPage()

    fireEvent.click(
      screen.getByRole("button", { name: "Meerdere aanschrijvingen?" }),
    )

    expect(
      within(screen.getByRole("dialog")).getByText(
        /^Verwerk eerst deze aanschrijving/,
      ),
    ).toBeTruthy()
    // The steps, in order.
    expect(
      within(screen.getByRole("dialog")).getAllByRole("listitem"),
    ).toHaveLength(4)
  })

  it("stays on the form when saving fails", async () => {
    createSummon.mockRejectedValue(new Error("500"))
    renderPage()
    chooseType("2")
    fireEvent.click(screen.getByLabelText("Natuurlijk persoon"))
    fillPerson(1, "Jan", "Vries", "PERSON_ROLE_OWNER")
    submit()

    await waitFor(() => expect(createSummon).toHaveBeenCalled())
    expect(location().textContent).toBe("/zaken/12/aanschrijving/34")
  })
})

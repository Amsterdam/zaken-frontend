// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import CreateCasePage from "../CreateCasePage"

const BAG_ID = "0363010000000001"
const createCase = vi.fn()

const reasonsByTheme: Record<number, { id: number; name: string }[]> = {
  1: [
    { id: 10, name: "SIG melding" },
    { id: 11, name: "Project" },
    { id: 12, name: "Digitaal toezicht" },
  ],
  2: [
    { id: 20, name: "MMA" },
    { id: 21, name: "Eigen onderzoek" },
  ],
}

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: ["create_case"] } }),
  useBagPdokByBagId: () => ({
    data: {
      response: {
        docs: [
          {
            adresseerbaarobject_id: BAG_ID,
            weergavenaam: "Amstel 1-H, 1011PN Amsterdam",
          },
        ],
      },
    },
  }),
  useCaseThemes: () => ({
    data: {
      results: [
        { id: 1, name: "Vakantieverhuur" },
        { id: 2, name: "Kamerverhuur" },
      ],
    },
  }),
  useReasons: (themeId?: number) => ({
    data: themeId ? { results: reasonsByTheme[themeId] } : undefined,
  }),
  useProjects: (themeId?: number) => ({
    data: themeId ? { results: [{ id: 30, name: "Hotelproject" }] } : undefined,
  }),
  useSubjects: (themeId?: number) => ({
    data: themeId
      ? {
          results:
            themeId === 1
              ? [
                  { id: 4, name: "Doorzon" },
                  { id: 6, name: "Hotel" },
                ]
              : [{ id: 9, name: "Onderhuur" }],
        }
      : undefined,
  }),
  useCasesByBagId: () => ({
    data: {
      results: [
        { id: 77, theme: { name: "Onderhuur" } },
        { id: 55, theme: { name: "Leegstand" } },
      ],
    },
  }),
  useCorporations: () => ({
    data: {
      results: [
        { id: 8, name: "Ymere" },
        { id: 7, name: "Eigen Haard" },
      ],
    },
  }),
  useListing: (tonId?: string) => ({
    data: tonId ? { url: "https://www.airbnb.nl/rooms/991" } : undefined,
  }),
  useCreateCase: () => ({ mutateAsync: createCase, isPending: false }),
}))

vi.mock("@/hooks/useHasPermission", () => ({ default: () => [true, false] }))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const Location = () => <output>{useLocation().pathname}</output>

const renderPage = (search = "") => {
  const path = `/adres/${BAG_ID}/zaken/nieuw`
  // The breadcrumbs read the path from window.location.
  window.history.pushState({}, "", path)
  return render(
    <MemoryRouter initialEntries={[`${path}${search}`]}>
      <FlashMessageProvider>
        <ToastProvider>
          <Routes>
            <Route
              path="/adres/:bagId/zaken/nieuw"
              element={<CreateCasePage />}
            />
            <Route path="*" element={null} />
          </Routes>
          <Location />
        </ToastProvider>
      </FlashMessageProvider>
    </MemoryRouter>,
  )
}

const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: "Zaak aanmaken" }))
const location = () =>
  screen.getByText(/^\/(zaken|adres)/, { selector: "output" })
const type = (label: RegExp, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
const chooseSubject = (name: string) =>
  fireEvent.click(screen.getByLabelText(name))

describe("the page to make a new case", () => {
  beforeEach(() => {
    createCase.mockReset().mockResolvedValue({ id: 99 })
  })

  it("shows the address and first only asks the theme", async () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Nieuwe zaak aanmaken" }),
    ).toBeTruthy()
    expect(screen.getByText("Amstel 1-H, 1011PN Amsterdam")).toBeTruthy()
    expect(screen.getByLabelText("Vakantieverhuur")).toBeTruthy()
    // The rest depends on the theme.
    expect(screen.queryByText("Aanleiding")).toBeNull()
    expect(screen.queryByLabelText(/^Korte toelichting/)).toBeNull()

    submit()
    expect(
      await screen.findByRole("link", { name: "Kies een thema." }),
    ).toBeTruthy()
    expect(createCase).not.toHaveBeenCalled()
  })

  it("asks what belongs to the theme, and lists what is missing", async () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Vakantieverhuur"))

    // The reasons of the theme, without the one for a listing in TON.
    expect(await screen.findByLabelText("SIG melding")).toBeTruthy()
    expect(screen.queryByLabelText("Digitaal toezicht")).toBeNull()
    // The corporations by name.
    expect(
      [
        ...screen.getByLabelText<HTMLSelectElement>(/^Welke corporatie/)
          .options,
      ].map((option) => option.text),
    ).toEqual(["Geen corporatie", "Eigen Haard", "Ymere"])
    submit()

    for (const message of [
      "Kies een aanleiding.",
      "Kies of er een advertentie bekend is.",
      "Kies ten minste één onderwerp.",
    ]) {
      expect(await screen.findByRole("link", { name: message })).toBeTruthy()
    }
    // The link of the subjects goes to the first of them.
    expect(
      screen
        .getByRole("link", { name: "Kies ten minste één onderwerp." })
        .getAttribute("href"),
    ).toBe(`#${screen.getByLabelText("Doorzon").id}`)
    expect(createCase).not.toHaveBeenCalled()
  })

  it("makes a case for a project, and goes to the new case", async () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Vakantieverhuur"))
    fireEvent.click(await screen.findByLabelText("Project"))
    type(/^Projectnaam/, "30")
    type(/^Welke corporatie/, "8")
    fireEvent.click(screen.getByLabelText("Nee, er is geen advertentie"))
    chooseSubject("Hotel")
    chooseSubject("Doorzon")
    type(/^Korte toelichting/, "Uit het hotelproject.")
    submit()

    await waitFor(() =>
      expect(createCase).toHaveBeenCalledWith({
        bag_id: BAG_ID,
        theme_id: 1,
        reason_id: 11,
        project_id: 30,
        housing_corporation: 8,
        subject_ids: [6, 4],
        description: "Uit het hotelproject.",
      }),
    )
    await waitFor(() => expect(location().textContent).toBe("/zaken/99"))
    expect(screen.getByText("Zaak aangemaakt")).toBeTruthy()
  })

  it("makes a case for a report of a citizen, with an advertisement", async () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Vakantieverhuur"))
    fireEvent.click(await screen.findByLabelText("SIG melding"))
    fireEvent.click(screen.getByLabelText("Ja, de melder is anoniem"))
    type(/^SIG-nummer/, "123456")
    type(/^Korte samenvatting melding/, "Toeristen met koffers.")
    fireEvent.click(screen.getByLabelText(/^Betreft overlast/))
    fireEvent.click(screen.getByLabelText("Ja, er is een advertentie"))
    type(/^Link 1/, "https://www.airbnb.nl/rooms/1")
    chooseSubject("Hotel")
    submit()

    await waitFor(() =>
      expect(createCase).toHaveBeenCalledWith({
        bag_id: BAG_ID,
        theme_id: 1,
        reason_id: 10,
        citizen_reports: [
          {
            identification: 123456,
            description_citizenreport: "Toeristen met koffers.",
            nuisance: true,
          },
        ],
        advertisements: [{ link: "https://www.airbnb.nl/rooms/1" }],
        subject_ids: [6],
      }),
    )
  })

  it("makes a case with an MMA number that follows another case", async () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Kamerverhuur"))
    fireEvent.click(await screen.findByLabelText("MMA"))
    // Kamerverhuur has no advertisements.
    expect(screen.queryByText("Is er een advertentie bekend?")).toBeNull()
    type(/^MMA-nummer/, "4321")
    chooseSubject("Onderhuur")
    fireEvent.click(screen.getByLabelText(/^Overgedragen vanuit ander thema/))
    // The cases on this address, by id.
    const previous = screen.getByLabelText<HTMLSelectElement>(
      /^Overgedragen zaak ID/,
    )
    expect([...previous.options].map((option) => option.text)).toEqual([
      "Maak een keuze",
      "55: Leegstand",
      "77: Onderhuur",
    ])
    submit()
    expect(
      await screen.findByRole("link", {
        name: "Kies de zaak die is overgedragen.",
      }),
    ).toBeTruthy()

    fireEvent.change(previous, { target: { value: "55" } })
    submit()

    await waitFor(() =>
      expect(createCase).toHaveBeenCalledWith({
        bag_id: BAG_ID,
        theme_id: 2,
        reason_id: 20,
        mma_number: 4321,
        subject_ids: [9],
        previous_case: 55,
      }),
    )
  })

  it("forgets the reason and the subjects when the theme changes", async () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Vakantieverhuur"))
    fireEvent.click(await screen.findByLabelText("Project"))
    chooseSubject("Hotel")

    fireEvent.click(screen.getByLabelText("Kamerverhuur"))

    expect(await screen.findByLabelText("MMA")).toBeTruthy()
    expect(screen.queryByLabelText(/^Projectnaam/)).toBeNull()
    // The subjects of the other theme now, none chosen.
    expect(screen.queryByLabelText("Hotel")).toBeNull()
    expect(screen.getByLabelText<HTMLInputElement>("Onderhuur").checked).toBe(
      false,
    )
  })

  it("starts filled in for a listing in TON", async () => {
    renderPage("?tonId=abc")

    // Only the theme and the reason of TON, already chosen.
    expect(screen.queryByLabelText("Kamerverhuur")).toBeNull()
    await waitFor(() =>
      expect(
        screen.getByLabelText<HTMLInputElement>("Digitaal toezicht").checked,
      ).toBe(true),
    )
    expect(screen.queryByLabelText("SIG melding")).toBeNull()
    // There is an advertisement for sure: the listing.
    expect(screen.queryByLabelText("Nee, er is geen advertentie")).toBeNull()
    expect(screen.getByLabelText<HTMLInputElement>(/^Link 1/).value).toBe(
      "https://www.airbnb.nl/rooms/991",
    )
    chooseSubject("Hotel")
    submit()

    await waitFor(() =>
      expect(createCase).toHaveBeenCalledWith({
        bag_id: BAG_ID,
        theme_id: 1,
        reason_id: 12,
        advertisements: [{ link: "https://www.airbnb.nl/rooms/991" }],
        subject_ids: [6],
        ton_ids: ["abc"],
      }),
    )
  })

  it("stays on the form when making the case fails, and cancels to the address", async () => {
    createCase.mockRejectedValue(new Error("500"))
    renderPage()
    fireEvent.click(screen.getByLabelText("Kamerverhuur"))
    fireEvent.click(await screen.findByLabelText("Eigen onderzoek"))
    chooseSubject("Onderhuur")
    submit()

    await waitFor(() => expect(createCase).toHaveBeenCalled())
    expect(location().textContent).toBe(`/adres/${BAG_ID}/zaken/nieuw`)

    fireEvent.click(screen.getByRole("button", { name: "Annuleren" }))
    expect(location().textContent).toBe(`/adres/${BAG_ID}`)
  })
})

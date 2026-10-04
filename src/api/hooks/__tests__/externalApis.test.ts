import { renderHook, waitFor } from "@testing-library/react"
import { useBagPdok, useBenkAgg, usePanorama } from "@/api/hooks"
import { createQueryWrapper } from "@/test-utils/createQueryWrapper"

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ user: { access_token: "mock-token" } }),
}))

vi.mock("app/routing/useNavigation", () => ({
  default: () => ({ navigateTo: vi.fn() }),
}))

const jsonResponse = (body: unknown) => ({
  ok: true,
  status: 200,
  statusText: "OK",
  text: () => Promise.resolve(JSON.stringify(body)),
})

describe("external APIs", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it.each([
    ["useBagPdok", () => useBagPdok("Amstel 1")],
    ["useBenkAgg", () => useBenkAgg("0363010000000001")],
    ["usePanorama", () => usePanorama({ lat: 52.3, lon: 4.9, width: 400 })],
  ])("%s never sends the user's token", async (_, useHook) => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useHook().isSuccess, {
      wrapper: Wrapper,
    })

    await waitFor(() => expect(result.current).toBe(true))
    expect(fetchMock.mock.calls[0][1].headers).toEqual({})
  })

  it("useBagPdok searches PDOK for main addresses in Amsterdam", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useBagPdok("Amstel 1"), {
      wrapper: Wrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    const url = new URL(fetchMock.mock.calls[0][0])
    expect(url.pathname).toMatch(/\/suggest$/)
    expect(url.searchParams.get("q")).toBe("Amstel 1")
    expect(url.searchParams.get("fq")).toBe(
      "gemeentenaam:(amsterdam)AND (type:adres) AND (adrestype: hoofdadres)",
    )
    expect(url.searchParams.get("rows")).toBe("25")
  })

  it("useBagPdok waits until there is a search string", () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useBagPdok(undefined), {
      wrapper: Wrapper,
    })

    expect(result.current.fetchStatus).toBe("idle")
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

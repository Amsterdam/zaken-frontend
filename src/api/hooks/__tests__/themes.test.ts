import { renderHook, waitFor } from "@testing-library/react"
import { useCaseThemes } from "@/api/hooks"
import { createQueryWrapper } from "@/test-utils/createQueryWrapper"

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ user: { access_token: "mock-token" } }),
}))

vi.mock("@/hooks/useNavigation", () => ({
  default: () => ({ navigateTo: vi.fn() }),
}))

const jsonResponse = (body: unknown) => ({
  ok: true,
  status: 200,
  statusText: "OK",
  text: () => Promise.resolve(JSON.stringify(body)),
})

describe("useCaseThemes", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("fetches the themes once and shares them between components", async () => {
    const themes = { count: 1, results: [{ id: 1, name: "Vakantieverhuur" }] }
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(themes))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const first = renderHook(() => useCaseThemes(), { wrapper: Wrapper })
    const second = renderHook(() => useCaseThemes(), { wrapper: Wrapper })

    await waitFor(() => expect(first.result.current.isSuccess).toBe(true))
    await waitFor(() => expect(second.result.current.isSuccess).toBe(true))

    expect(first.result.current.data).toEqual(themes)
    expect(second.result.current.data).toEqual(themes)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toMatch(/\/themes\/$/)
  })
})

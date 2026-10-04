import { act, renderHook, waitFor } from "@testing-library/react"
import { useSendFeedback } from "@/api/hooks"
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

describe("useSendFeedback", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("posts the feedback with where it comes from", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()
    // The page and the browser are added to the feedback.
    const payload = {
      feedback: "Werkt goed",
      url: window.location.href,
      user_agent: navigator.userAgent,
      screen: `${window.innerWidth}x${window.innerHeight}`,
    }

    const { result } = renderHook(() => useSendFeedback(), {
      wrapper: Wrapper,
    })
    act(() => result.current.mutate("Werkt goed"))

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/feedback\/$/)
    expect(init).toMatchObject({
      method: "POST",
      body: JSON.stringify(payload),
    })
  })
})

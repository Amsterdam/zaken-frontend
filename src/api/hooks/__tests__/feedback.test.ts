import { act, renderHook, waitFor } from "@testing-library/react"
import { useCreateFeedback } from "@/api/hooks"
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

describe("useCreateFeedback", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("posts the feedback", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()
    const payload = {
      feedback: "Werkt goed",
      url: "https://zaken.test/zaken",
      user_agent: "vitest",
      screen: "1024x768",
    }

    const { result } = renderHook(() => useCreateFeedback(), {
      wrapper: Wrapper,
    })
    act(() => result.current.mutate(payload))

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/feedback\/$/)
    expect(init).toMatchObject({
      method: "POST",
      body: JSON.stringify(payload),
    })
  })
})

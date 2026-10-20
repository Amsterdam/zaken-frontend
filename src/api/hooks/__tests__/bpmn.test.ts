import { renderHook, waitFor } from "@testing-library/react"
import { useBpmnFile, useBpmnModels } from "@/api/hooks"
import { createQueryWrapper } from "@/test-utils/createQueryWrapper"

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ user: { access_token: "mock-token" } }),
}))

vi.mock("@/hooks/useNavigation", () => ({
  default: () => ({ navigateTo: vi.fn() }),
}))

const textResponse = (body: string) => ({
  ok: true,
  status: 200,
  statusText: "OK",
  text: () => Promise.resolve(body),
})

describe("the BPMN hooks", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("fetches no versions before a model is chosen", () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    renderHook(() => useBpmnModels(undefined), { wrapper: Wrapper })

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("gives the BPMN file as text", async () => {
    const xml = '<?xml version="1.0"?><bpmn:definitions />'
    const fetchMock = vi.fn().mockResolvedValue(textResponse(xml))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useBpmnFile("director", "0.1.0"), {
      wrapper: Wrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBe(xml)
    expect(fetchMock.mock.calls[0][0]).toMatch(
      /\/bpmn-models\/director\/file\/0\.1\.0\/$/,
    )
  })
})

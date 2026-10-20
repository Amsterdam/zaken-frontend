import { act, renderHook, waitFor } from "@testing-library/react"
import { useCase, useCreateDebriefing } from "@/api/hooks"
import { queryKeys } from "@/api/queryKeys"
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

describe("case form mutations", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("mark everything of the case stale without refetching on the form itself", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: 5527 }))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper, queryClient } = createQueryWrapper()
    queryClient.setQueryData(queryKeys.cases.workflows(5527), {})
    queryClient.setQueryData(queryKeys.cases.events(5527), [])
    queryClient.setQueryData(queryKeys.cases.workflows(1), {})
    queryClient.setQueryData(queryKeys.cases.list({ page: 1 }), {})

    // Like the debrief form: it shows the case while it's open.
    const { result } = renderHook(
      () => ({ caseQuery: useCase(5527), debrief: useCreateDebriefing(5527) }),
      { wrapper: Wrapper },
    )
    await waitFor(() => expect(result.current.caseQuery.isSuccess).toBe(true))
    fetchMock.mockClear()

    await act(() =>
      result.current.debrief.mutateAsync({
        case: 5527,
      } as components["schemas"]["DebriefingCreate"]),
    )

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/debriefings\/$/)
    expect(init).toMatchObject({ method: "POST" })
    for (const queryKey of [
      queryKeys.cases.detail(5527),
      queryKeys.cases.workflows(5527),
      queryKeys.cases.events(5527),
      queryKeys.cases.list({ page: 1 }),
    ]) {
      expect(queryClient.getQueryState(queryKey)?.isInvalidated).toBe(true)
    }
    // Another case is left alone.
    expect(
      queryClient.getQueryState(queryKeys.cases.workflows(1))?.isInvalidated,
    ).toBe(false)
  })
})

import { act, renderHook, waitFor } from "@testing-library/react"
import {
  useCase,
  useCaseWorkflows,
  useCompleteTask,
  useUpdateTask,
} from "@/api/hooks"
import { queryKeys } from "@/api/queryKeys"
import { createLegacyApiWrapper } from "@/test-utils/createLegacyApiWrapper"

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

describe("useUpdateTask", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("only refreshes the workflows of the case and marks the old task lists stale", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: 7 }))
    vi.stubGlobal("fetch", fetchMock)
    const clearOldCasesCache = vi.fn()
    const invalidateOldCasesItems = vi.fn()
    const { Wrapper, queryClient } = createLegacyApiWrapper({
      cases: {
        clearCache: clearOldCasesCache,
        invalidateCacheItems: invalidateOldCasesItems,
      },
    })
    queryClient.setQueryData(queryKeys.cases.detail(5567), {})
    queryClient.setQueryData(queryKeys.cases.workflows(5567), {})
    queryClient.setQueryData(queryKeys.cases.workflows(1), {})

    const { result } = renderHook(() => useUpdateTask(7, 5567), {
      wrapper: Wrapper,
    })
    await act(() =>
      result.current.mutateAsync({ due_date: "2026-10-31T00:00:00+01:00" }),
    )

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/tasks\/7\/$/)
    expect(init).toMatchObject({ method: "PATCH" })
    expect(
      queryClient.getQueryState(queryKeys.cases.workflows(5567))?.isInvalidated,
    ).toBe(true)
    // Not the case itself, nor another case.
    expect(
      queryClient.getQueryState(queryKeys.cases.detail(5567))?.isInvalidated,
    ).toBe(false)
    expect(
      queryClient.getQueryState(queryKeys.cases.workflows(1))?.isInvalidated,
    ).toBe(false)
    // Old cache: only the task lists, not the whole cases group (events, schedules, ...).
    expect(clearOldCasesCache).not.toHaveBeenCalled()
    expect(invalidateOldCasesItems).toHaveBeenCalledWith(
      expect.stringMatching(/\/tasks\/$/),
    )
  })
})

describe("useCompleteTask", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("refetches the workflows only after the POST, and doesn't refetch the case", async () => {
    const fetchMock = vi.fn((url: string) =>
      Promise.resolve(
        jsonResponse(
          url.endsWith("/workflows/") ? { results: [] } : { id: 5527 },
        ),
      ),
    )
    vi.stubGlobal("fetch", fetchMock)
    const invalidateOldCasesItems = vi.fn()
    const { Wrapper, queryClient } = createLegacyApiWrapper({
      cases: { invalidateCacheItems: invalidateOldCasesItems },
    })
    const { result } = renderHook(
      () => ({
        caseQuery: useCase(5527),
        workflowsQuery: useCaseWorkflows(5527),
        completeTask: useCompleteTask(5527),
      }),
      { wrapper: Wrapper },
    )
    await waitFor(() => expect(result.current.caseQuery.isSuccess).toBe(true))
    await waitFor(() =>
      expect(result.current.workflowsQuery.isSuccess).toBe(true),
    )
    fetchMock.mockClear()

    await act(() =>
      result.current.completeTask.mutateAsync({
        case: 5527,
        case_user_task_id: 12,
        variables: {},
      }),
    )
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))

    const urls = fetchMock.mock.calls.map(([url]) => url)
    expect(urls[0]).toMatch(/\/generic-tasks\/complete\/$/)
    expect(urls[1]).toMatch(/\/cases\/5527\/workflows\/$/)
    // The case is marked stale for the next screen, not refetched now.
    expect(
      queryClient.getQueryState(queryKeys.cases.detail(5527))?.isInvalidated,
    ).toBe(true)
    expect(urls).not.toContainEqual(expect.stringMatching(/\/cases\/5527\/$/))
    // Old cache: events (new GENERIC_TASK event) and the lists.
    expect(
      invalidateOldCasesItems.mock.calls.map(([prefix]) => prefix),
    ).toEqual([
      expect.stringMatching(/\/cases\/5527\/events\/$/),
      expect.stringMatching(/\/cases\/\?$/),
      expect.stringMatching(/\/tasks\/$/),
    ])
  })
})

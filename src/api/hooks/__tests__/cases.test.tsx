import { useContext, type ReactNode } from "react"
import { act, renderHook, waitFor } from "@testing-library/react"
import { QueryClientProvider } from "@tanstack/react-query"
import {
  useCaseWorkflows,
  useSetWorkflowTaskOwner,
  useUpdateCase,
} from "@/api/hooks"
import { queryKeys } from "@/api/queryKeys"
import { queryClient } from "@/api/queryClient"
import { registerFlashMessageBridge } from "app/state/flashMessages/flashMessageBridge"
import { createQueryWrapper } from "@/test-utils/createQueryWrapper"
import ApiProvider, { ApiContext } from "app/state/rest/provider/ApiProvider"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

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

const workflows = (count: number): Tasks.PaginatedWorkflowList => ({
  count,
  results: Array.from({ length: count }, (_, i) => ({
    state: { name: `Status ${i}` },
    information: "",
    tasks: [
      {
        id: i,
        case_user_task_id: `task-${i}`,
        owner: null,
        due_date: "2026-10-02",
        case: 1,
        task_name: "task_create_visit",
        user_has_permission: true,
        form: [],
      },
    ],
  })),
})

// Lets the fetch promise of a (re)fetch resolve.
const flush = () => act(() => vi.advanceTimersByTimeAsync(0))
const advance = (ms: number) => act(() => vi.advanceTimersByTimeAsync(ms))

describe("useCaseWorkflows polling", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  const renderWorkflows = (pollWhileEmpty: boolean) => {
    const { Wrapper } = createQueryWrapper()
    return renderHook(() => useCaseWorkflows(1, { pollWhileEmpty }), {
      wrapper: Wrapper,
    })
  }

  it("does not poll when there are workflows", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(workflows(1)))
    vi.stubGlobal("fetch", fetchMock)

    const { result } = renderWorkflows(true)
    await flush()
    await advance(60_000)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(result.current.isPolling).toBe(false)
  })

  it("does not poll when polling is disabled", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(workflows(0)))
    vi.stubGlobal("fetch", fetchMock)

    const { result } = renderWorkflows(false)
    await flush()
    await advance(60_000)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(result.current.isPolling).toBe(false)
  })

  it("polls with exponential backoff while empty and stops after 5 attempts", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(workflows(0)))
    vi.stubGlobal("fetch", fetchMock)

    const { result } = renderWorkflows(true)
    await flush()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(result.current.isPolling).toBe(true)

    // 1s, 2s, 4s, 8s, 16s
    for (const [delay, calls] of [
      [1000, 2],
      [2000, 3],
      [4000, 4],
      [8000, 5],
      [16000, 6],
    ]) {
      await advance(delay - 1)
      expect(fetchMock).toHaveBeenCalledTimes(calls - 1)
      await advance(1)
      expect(fetchMock).toHaveBeenCalledTimes(calls)
    }

    await advance(60_000)
    expect(fetchMock).toHaveBeenCalledTimes(6)
    expect(result.current.isPolling).toBe(false)
  })

  it("also stops after 5 attempts when polling keeps failing", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(workflows(0)))
      .mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: () => Promise.resolve(""),
      })
    vi.stubGlobal("fetch", fetchMock)

    const { result } = renderWorkflows(true)
    await flush()
    await advance(1000 + 2000 + 4000 + 8000 + 16000)
    await advance(10)
    expect(fetchMock).toHaveBeenCalledTimes(6)

    await advance(120_000)
    expect(fetchMock).toHaveBeenCalledTimes(6)
    expect(result.current.isPolling).toBe(false)
  })

  it("also polls when the first fetch already fails, and stays polling until the last attempt", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValue(new TypeError("Failed to fetch"))
    vi.stubGlobal("fetch", fetchMock)

    const { result } = renderWorkflows(true)
    await flush()
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPolling).toBe(true)

    // Still polling (so still "loading") between and during the attempts.
    for (const delay of [1000, 2000, 4000, 8000]) {
      await advance(delay)
      expect(result.current.isPolling).toBe(true)
    }
    await advance(16000)
    await advance(10)

    expect(fetchMock).toHaveBeenCalledTimes(6)
    expect(result.current.isPolling).toBe(false)
    await advance(120_000)
    expect(fetchMock).toHaveBeenCalledTimes(6)
  })

  it("stops polling as soon as the workflows arrive", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(workflows(0)))
      .mockResolvedValue(jsonResponse(workflows(2)))
    vi.stubGlobal("fetch", fetchMock)

    const { result } = renderWorkflows(true)
    await flush()
    await advance(1000)
    await advance(10)

    expect(result.current.data?.results).toHaveLength(2)
    expect(result.current.isPolling).toBe(false)
    await advance(60_000)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})

describe("useCaseWorkflows errors", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    queryClient.clear()
  })

  it("never shows an error message for the workflows", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Failed to fetch")),
    )
    const addErrorFlashMessage = vi.fn()
    const unregister = registerFlashMessageBridge(addErrorFlashMessage)
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useCaseWorkflows(1), {
      wrapper: Wrapper,
    })
    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(addErrorFlashMessage).not.toHaveBeenCalled()
    unregister()
  })
})

describe("useSetWorkflowTaskOwner", () => {
  it("changes only the owner of the given task in the cache", () => {
    const { Wrapper, queryClient } = createQueryWrapper()
    queryClient.setQueryData(queryKeys.cases.workflows(1), workflows(2))

    const { result } = renderHook(() => useSetWorkflowTaskOwner(1), {
      wrapper: Wrapper,
    })
    act(() => result.current("task-1", "jan@amsterdam.nl"))

    const data = queryClient.getQueryData<Tasks.PaginatedWorkflowList>(
      queryKeys.cases.workflows(1),
    )
    expect(data?.results[0].tasks[0].owner).toBeNull()
    expect(data?.results[1].tasks[0].owner).toBe("jan@amsterdam.nl")
  })
})

describe("useUpdateCase", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("patches the case and updates the caches from the response, without refetching", async () => {
    const tags = [{ id: 3, name: "Spoed" }]
    const subjects = [{ id: 8, name: "Woonfraude" }]
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ id: 5567, tags, subjects }))
    vi.stubGlobal("fetch", fetchMock)
    const { queryClient } = createQueryWrapper()
    queryClient.setQueryData(queryKeys.cases.detail(5567), {
      id: 5567,
      description: "Blijft staan",
      tags: [],
      subjects: [],
    })
    queryClient.setQueryData(queryKeys.cases.workflows(5567), {})
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <ApiProvider>{children}</ApiProvider>
      </QueryClientProvider>
    )
    const { result } = renderHook(
      () => ({
        oldCasesCache: useContext(ApiContext).cases,
        mutation: useUpdateCase(5567),
      }),
      { wrapper: Wrapper },
    )
    const eventsUrl = makeApiUrl("cases", 5567, "events")
    const casesListUrl = `${makeApiUrl("cases")}?page=1`
    act(() => {
      result.current.oldCasesCache.setCacheItem(eventsUrl, [
        {
          id: 1,
          type: "CASE",
          event_values: { subjects: [], reason: "Melding" },
        },
      ])
      result.current.oldCasesCache.setCacheItem(casesListUrl, { results: [] })
    })

    await act(() => result.current.mutation.mutateAsync({ tag_ids: [3] }))

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/cases\/5567\/$/)
    expect(init).toMatchObject({
      method: "PATCH",
      body: JSON.stringify({ tag_ids: [3] }),
    })
    // The case is updated in place, not invalidated.
    const caseState = queryClient.getQueryState(queryKeys.cases.detail(5567))
    expect(caseState?.data).toEqual({
      id: 5567,
      description: "Blijft staan",
      tags,
      subjects,
    })
    expect(caseState?.isInvalidated).toBe(false)
    expect(
      queryClient.getQueryState(queryKeys.cases.workflows(5567))?.isInvalidated,
    ).toBe(false)
    // The timeline's CASE event shows the new subjects, still valid.
    const events = result.current.oldCasesCache.getCacheItem(eventsUrl)
    expect(events.valid).toBe(true)
    expect(events.value[0].event_values).toEqual({
      subjects: ["Woonfraude"],
      reason: "Melding",
    })
    // The case list (filterable on tag/subject) reloads next time it's shown.
    expect(result.current.oldCasesCache.getCacheItem(casesListUrl).valid).toBe(
      false,
    )
  })
})

import type { ReactNode } from "react"
import { act, renderHook, waitFor } from "@testing-library/react"
import { QueryClientProvider } from "@tanstack/react-query"
import {
  useCase,
  useCases,
  useCasesByBagId,
  useCaseWorkflows,
  useUpdateCase,
} from "@/api/hooks"
import { queryKeys } from "@/api/queryKeys"
import { queryClient } from "@/api/queryClient"
import { registerToastBridge } from "@/components/toasts/toastBridge"
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
    const showToast = vi.fn()
    registerToastBridge(showToast)
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useCaseWorkflows(1), {
      wrapper: Wrapper,
    })
    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(showToast).not.toHaveBeenCalled()
  })
})

describe("useCase errors", () => {
  const response = (status: number, statusText: string) => ({
    ok: false,
    status,
    statusText,
    text: () => Promise.resolve(""),
  })
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  afterEach(() => {
    vi.unstubAllGlobals()
    queryClient.clear()
  })

  it("shows no toast for a case that does not exist", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response(404, "Not Found")),
    )
    const showToast = vi.fn()
    registerToastBridge(showToast)

    const { result } = renderHook(() => useCase(404404), { wrapper: Wrapper })
    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(showToast).not.toHaveBeenCalled()
  })

  it("shows a toast for another error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response(500, "Internal Server Error")),
    )
    const showToast = vi.fn()
    registerToastBridge(showToast)

    const { result } = renderHook(() => useCase(500500), { wrapper: Wrapper })
    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(showToast).toHaveBeenCalledTimes(1)
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
    const { Wrapper, queryClient } = createQueryWrapper()
    queryClient.setQueryData(queryKeys.cases.detail(5567), {
      id: 5567,
      description: "Blijft staan",
      tags: [],
      subjects: [],
    })
    queryClient.setQueryData(queryKeys.cases.workflows(5567), {})
    queryClient.setQueryData(queryKeys.cases.list({ page: 1 }), {})
    queryClient.setQueryData(queryKeys.cases.tasks({ page: 1 }), {})
    queryClient.setQueryData(queryKeys.cases.events(5567), [
      {
        id: 1,
        type: "CASE",
        event_values: { subjects: [], reason: "Melding" },
      },
    ])
    const { result } = renderHook(() => ({ mutation: useUpdateCase(5567) }), {
      wrapper: Wrapper,
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
    const eventsState = queryClient.getQueryState<
      { event_values: Record<string, unknown> }[]
    >(queryKeys.cases.events(5567))
    expect(eventsState?.isInvalidated).toBe(false)
    expect(eventsState?.data?.[0].event_values).toEqual({
      subjects: ["Woonfraude"],
      reason: "Melding",
    })
    // The case and task lists (filterable on tag/subject) reload next time they're shown.
    expect(
      queryClient.getQueryState(queryKeys.cases.list({ page: 1 }))
        ?.isInvalidated,
    ).toBe(true)
    expect(
      queryClient.getQueryState(queryKeys.cases.tasks({ page: 1 }))
        ?.isInvalidated,
    ).toBe(true)
  })
})

describe("useCases", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("builds the same query string as before, leaving out empty filters", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ count: 0, results: [] }))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const { result } = renderHook(
      () =>
        useCases({
          pagination: { page: 1, pageSize: 10 },
          sorting: { dataIndex: "start_date", order: "ASCEND" },
          theme: "",
          addressSearch: "",
          fromStartDate: "2026-01-01",
          openCases: "closed",
          reason: "Melding",
          projects: [],
          districtNames: ["Centrum", "Noord"],
          housingCorporations: [],
        }),
      { wrapper: Wrapper },
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const url = new URL(fetchMock.mock.calls[0][0])
    expect(url.pathname).toMatch(/\/cases\/$/)
    expect([...url.searchParams]).toEqual([
      ["page", "1"],
      ["page_size", "10"],
      ["from_start_date", "2026-01-01"],
      ["open_cases", "false"],
      ["simplified", "true"],
      ["sensitive", "false"],
      ["reason_name", "Melding"],
      ["district_name", "Centrum"],
      ["district_name", "Noord"],
      ["ordering", "start_date, id"],
    ])
  })
})

describe("useCasesByBagId", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it.each([
    [undefined, ""],
    [true, "?open_cases=true"],
  ])("with openCases %s fetches %s", async (openCases, query) => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ count: 0, results: [] }))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const { result } = renderHook(() => useCasesByBagId("0363", openCases), {
      wrapper: Wrapper,
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(fetchMock.mock.calls[0][0]).toMatch(
      new RegExp(`/addresses/0363/cases/${query.replace("?", "\\?")}$`),
    )
  })
})

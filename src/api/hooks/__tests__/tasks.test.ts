import { act, renderHook, waitFor } from "@testing-library/react"
import {
  useAssignTask,
  useCase,
  useCaseWorkflows,
  useCompleteTask,
  useTasks,
  useUpdateTask,
} from "@/api/hooks"
import { createQueryWrapper } from "@/test-utils/createQueryWrapper"
import { queryKeys } from "@/api/queryKeys"

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

describe("useUpdateTask", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("only refreshes the workflows of the case and marks the task lists stale", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: 7 }))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper, queryClient } = createQueryWrapper()
    queryClient.setQueryData(queryKeys.cases.detail(5567), {})
    queryClient.setQueryData(queryKeys.cases.events(5567), [])
    queryClient.setQueryData(queryKeys.cases.schedules(5567), [])
    queryClient.setQueryData(queryKeys.cases.workflows(5567), {})
    queryClient.setQueryData(queryKeys.cases.workflows(1), {})
    queryClient.setQueryData(queryKeys.cases.tasks({ page: 1 }), {})

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
    // The task lists are marked stale (they're sorted on due date).
    expect(
      queryClient.getQueryState(queryKeys.cases.tasks({ page: 1 }))
        ?.isInvalidated,
    ).toBe(true)
    // Not the rest of the case (events, schedules, ...).
    for (const queryKey of [
      queryKeys.cases.events(5567),
      queryKeys.cases.schedules(5567),
    ]) {
      expect(queryClient.getQueryState(queryKey)?.isInvalidated).toBe(false)
    }
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
    const { Wrapper, queryClient } = createQueryWrapper()
    queryClient.setQueryData(queryKeys.cases.events(5527), [])
    queryClient.setQueryData(queryKeys.cases.schedules(5527), [])
    queryClient.setQueryData(queryKeys.cases.workflowInstances(5527), [])
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
    // The events (new GENERIC_TASK event), not the schedules.
    expect(
      queryClient.getQueryState(queryKeys.cases.events(5527))?.isInvalidated,
    ).toBe(true)
    expect(
      queryClient.getQueryState(queryKeys.cases.schedules(5527))?.isInvalidated,
    ).toBe(false)
    // The processes are at a next step.
    expect(
      queryClient.getQueryState(queryKeys.cases.workflowInstances(5527))
        ?.isInvalidated,
    ).toBe(true)
  })
})

describe("useTasks", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("builds the same query string as before, skipping empty filters", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(jsonResponse({ count: 0, results: [] }))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const { result } = renderHook(
      () =>
        useTasks({
          pagination: { page: 2, pageSize: 25 },
          sorting: { dataIndex: "due_date", order: "DESCEND" },
          theme: "Vakantieverhuur",
          tags: ["Spoed", "Extra"],
          subjects: [],
          owner: undefined,
          role: "",
          isEnforcementRequest: false,
          housingCorporationIsNull: true,
        }),
      { wrapper: Wrapper },
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const url = new URL(fetchMock.mock.calls[0][0])
    expect(url.pathname).toMatch(/\/tasks\/$/)
    expect([...url.searchParams]).toEqual([
      ["completed", "false"],
      ["page", "2"],
      ["page_size", "25"],
      ["is_enforcement_request", "false"],
      ["sensitive", "false"],
      ["theme_name", "Vakantieverhuur"],
      ["tag", "Spoed"],
      ["tag", "Extra"],
      ["housing_corporation_isnull", "true"],
      ["ordering", "-due_date, id"],
    ])
  })

  it("keeps showing the previous page while the next one loads", async () => {
    let resolveNextPage: (value: unknown) => void = () => {}
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ count: 50, results: [{ id: 1 }] }))
      .mockReturnValueOnce(
        new Promise((resolve) => {
          resolveNextPage = resolve
        }),
      )
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper } = createQueryWrapper()

    const { result, rerender } = renderHook(
      ({ page }) => useTasks({ pagination: { page, pageSize: 25 } }),
      { wrapper: Wrapper, initialProps: { page: 1 } },
    )
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    rerender({ page: 2 })
    expect(result.current.data?.results).toEqual([{ id: 1 }])
    expect(result.current.isPlaceholderData).toBe(true)

    await act(async () => {
      resolveNextPage(jsonResponse({ count: 50, results: [{ id: 26 }] }))
    })
    await waitFor(() =>
      expect(result.current.data?.results).toEqual([{ id: 26 }]),
    )
    expect(result.current.isPlaceholderData).toBe(false)
  })
})

describe("useAssignTask", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("updates the owner in the task lists and the workflows, without refetching", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal("fetch", fetchMock)
    const { Wrapper, queryClient } = createQueryWrapper()
    const listKey = queryKeys.cases.tasks({ page: 1 })
    queryClient.setQueryData(listKey, {
      count: 2,
      results: [
        { id: 12, owner: null },
        { id: 13, owner: null },
      ],
    })
    queryClient.setQueryData(queryKeys.cases.workflows(5527), {
      results: [
        {
          state: { name: "Status" },
          tasks: [
            // The workflows return the task id as a string.
            { case_user_task_id: "12", owner: null },
            { case_user_task_id: "14", owner: null },
          ],
        },
      ],
    })

    const { result } = renderHook(() => useAssignTask(12), {
      wrapper: Wrapper,
    })
    await act(() => result.current.mutateAsync("jan@amsterdam.nl"))

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/tasks\/12\/$/)
    expect(init).toMatchObject({
      method: "PATCH",
      body: JSON.stringify({ owner: "jan@amsterdam.nl" }),
    })
    expect(
      queryClient
        .getQueryData<{ results: { owner: string | null }[] }>(listKey)
        ?.results.map(({ owner }) => owner),
    ).toEqual(["jan@amsterdam.nl", null])
    expect(
      queryClient
        .getQueryData<Tasks.PaginatedWorkflowList>(
          queryKeys.cases.workflows(5527),
        )
        ?.results[0].tasks.map(({ owner }) => owner),
    ).toEqual(["jan@amsterdam.nl", null])
    expect(queryClient.getQueryState(listKey)?.isInvalidated).toBe(false)
  })
})

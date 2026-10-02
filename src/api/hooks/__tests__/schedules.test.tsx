import { useContext, type ReactNode } from "react"
import { act, renderHook } from "@testing-library/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { useUpdateSchedule } from "@/api/hooks"
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

const schedulesUrl = makeApiUrl("cases", 5567, "schedules")
const eventsUrl = makeApiUrl("cases", 5567, "events")

const update = {
  week_segment: { id: 2, name: "Weekend" },
  day_segment: { id: 3, name: "Avond" },
  priority: { id: 4, name: "Hoog" },
  visit_from_datetime: "2026-10-12T00:00:00+02:00",
}

// The real old cache (ApiProvider), so the in-place updates are tested for real.
const renderUpdateSchedule = (scheduleId?: number) => {
  const { queryClient } = createQueryWrapper()
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>{children}</ApiProvider>
    </QueryClientProvider>
  )
  return renderHook(
    () => ({
      oldCasesCache: useContext(ApiContext).cases,
      mutation: useUpdateSchedule(scheduleId, 5567),
    }),
    { wrapper: Wrapper },
  ).result
}

describe("useUpdateSchedule", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("patches the schedule and updates the cached schedules and timeline without refetching", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ id: 1759 }))
    vi.stubGlobal("fetch", fetchMock)
    const result = renderUpdateSchedule(1759)
    act(() => {
      result.current.oldCasesCache.setCacheItem(schedulesUrl, [
        {
          id: 1759,
          week_segment: 1,
          day_segment: 1,
          priority: { id: 1, name: "Normaal", weight: 0.5 },
          visit_from_datetime: null,
          date_modified: "2026-01-01T00:00:00Z",
        },
      ])
      result.current.oldCasesCache.setCacheItem(eventsUrl, [
        {
          id: 1,
          type: "SCHEDULE",
          emitter_id: 1759,
          event_values: { priority: "Normaal", author: "Jan" },
        },
        {
          id: 2,
          type: "SCHEDULE",
          emitter_id: 1,
          event_values: { priority: "Normaal" },
        },
      ])
    })

    await act(() => result.current.mutation.mutateAsync(update))

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toMatch(/\/schedules\/1759\/$/)
    expect(init).toMatchObject({
      method: "PATCH",
      body: JSON.stringify({
        week_segment: 2,
        day_segment: 3,
        priority: 4,
        visit_from_datetime: "2026-10-12T00:00:00+02:00",
      }),
    })

    const schedules = result.current.oldCasesCache.getCacheItem(schedulesUrl)
    expect(schedules.valid).toBe(true)
    expect(schedules.value[0]).toMatchObject({
      week_segment: 2,
      day_segment: 3,
      priority: { id: 4, name: "Hoog", weight: 0.5 },
      visit_from_datetime: "2026-10-12T00:00:00+02:00",
    })
    expect(schedules.value[0].date_modified).not.toBe("2026-01-01T00:00:00Z")

    const events = result.current.oldCasesCache.getCacheItem(eventsUrl)
    expect(events.valid).toBe(true)
    expect(events.value[0].event_values).toEqual({
      priority: "Hoog",
      week_segment: "Weekend",
      day_segment: "Avond",
      visit_from_datetime: "2026-10-12T00:00:00+02:00",
      author: "Jan",
    })
    // Another schedule's event is left alone.
    expect(events.value[1].event_values).toEqual({ priority: "Normaal" })
  })

  it("does nothing to the cache when the case's schedules and events aren't cached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({})))
    const result = renderUpdateSchedule(1759)

    await act(() => result.current.mutation.mutateAsync(update))

    expect(
      result.current.oldCasesCache.getCacheItem(schedulesUrl),
    ).toBeUndefined()
    expect(result.current.oldCasesCache.getCacheItem(eventsUrl)).toBeUndefined()
  })

  it("does not send a request when there is no schedule yet", async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)
    const result = renderUpdateSchedule(undefined)

    await act(async () => {
      await expect(result.current.mutation.mutateAsync(update)).rejects.toThrow(
        "Er is geen planning om aan te passen.",
      )
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })
})

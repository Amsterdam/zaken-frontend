import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { queryKeys } from "@/api/queryKeys"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

type CaseId = components["schemas"]["CaseDetail"]["id"]
type Option = { id: number; name: string }

/** A schedule as GET cases/:id/schedules/ returns it (ScheduleListSerializer). */
export type CaseSchedule = Omit<
  components["schemas"]["ScheduleCreate"],
  "priority" | "week_segment" | "day_segment"
> & {
  week_segment: number
  day_segment: number
  priority: Option
  date_modified: string
}

export const useSchedulesByCaseId = (caseId: CaseId) => {
  const fetch = useApiFetch()

  return useQuery({
    queryKey: queryKeys.cases.schedules(caseId),
    queryFn: () =>
      fetch<CaseSchedule[]>(makeApiUrl("cases", caseId, "schedules")),
  })
}

export type ScheduleUpdate = {
  week_segment: Option
  day_segment: Option
  priority: Option
  visit_from_datetime: string | null
}

/**
 * PATCH a schedule (planned visit) without refetching anything: the cached
 * schedules of the case (the "Urgentie" column) and the timeline's SCHEDULE
 * event are updated in place. The backend reads that event's values live from
 * the schedule, as names, which is why the update takes the options with
 * their names instead of only ids.
 */
export const useUpdateSchedule = (
  scheduleId: number | undefined,
  caseId: CaseId,
) => {
  const fetch = useApiFetch()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      week_segment,
      day_segment,
      priority,
      visit_from_datetime,
    }: ScheduleUpdate) => {
      if (scheduleId === undefined) {
        throw new Error("Er is geen planning om aan te passen.")
      }
      return fetch(makeApiUrl("schedules", scheduleId), {
        method: "PATCH",
        data: {
          week_segment: week_segment.id,
          day_segment: day_segment.id,
          priority: priority.id,
          visit_from_datetime,
        },
      })
    },
    onSuccess: (_, update) => {
      queryClient.setQueryData<CaseSchedule[]>(
        queryKeys.cases.schedules(caseId),
        (schedules) =>
          schedules?.map((schedule) =>
            schedule.id === scheduleId
              ? {
                  ...schedule,
                  week_segment: update.week_segment.id,
                  day_segment: update.day_segment.id,
                  priority: { ...schedule.priority, ...update.priority },
                  visit_from_datetime: update.visit_from_datetime,
                  date_modified: new Date().toISOString(),
                }
              : schedule,
          ),
      )
      queryClient.setQueryData<components["schemas"]["CaseEvent"][]>(
        queryKeys.cases.events(caseId),
        (events) =>
          events?.map((event) =>
            event.type === "SCHEDULE" && event.emitter_id === scheduleId
              ? {
                  ...event,
                  event_values: {
                    ...(event.event_values as Record<string, unknown>),
                    week_segment: update.week_segment.name,
                    day_segment: update.day_segment.name,
                    priority: update.priority.name,
                    visit_from_datetime: update.visit_from_datetime,
                  },
                }
              : event,
          ),
      )
    },
  })
}

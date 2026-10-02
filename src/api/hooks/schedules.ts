import { useMutation } from "@tanstack/react-query"
import { useApiFetch } from "@/api/useApiFetch"
import { useUpdateLegacyCacheItem } from "@/api/legacyCacheBridge"
import { makeApiUrl } from "app/state/rest/hooks/utils/apiUrl"

type Option = { id: number; name: string }

export type ScheduleUpdate = {
  week_segment: Option
  day_segment: Option
  priority: Option
  visit_from_datetime: string | null
}

type CachedSchedule = {
  id: number
  week_segment: number
  day_segment: number
  priority: Option
  visit_from_datetime: string | null
  date_modified: string
}

/**
 * PATCH a schedule (planned visit) without refetching anything: the cached
 * schedules of the case (the "Urgentie" column) and the timeline's SCHEDULE
 * event are updated in place. The backend reads that event's values live from
 * the schedule, as names, which is why the update takes the options with
 * their names instead of only ids. Both caches are still in the old layer.
 */
export const useUpdateSchedule = (
  scheduleId: number | undefined,
  caseId: components["schemas"]["CaseDetail"]["id"],
) => {
  const fetch = useApiFetch()
  const updateOldCasesItem = useUpdateLegacyCacheItem("cases")

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
      updateOldCasesItem<CachedSchedule[]>(
        makeApiUrl("cases", caseId, "schedules"),
        (schedules) => {
          const schedule = schedules.find(({ id }) => id === scheduleId)
          if (!schedule) return
          schedule.week_segment = update.week_segment.id
          schedule.day_segment = update.day_segment.id
          schedule.priority = { ...schedule.priority, ...update.priority }
          schedule.visit_from_datetime = update.visit_from_datetime
          schedule.date_modified = new Date().toISOString()
        },
      )
      updateOldCasesItem<components["schemas"]["CaseEvent"][]>(
        makeApiUrl("cases", caseId, "events"),
        (events) => {
          const event = events.find(
            ({ type, emitter_id }) =>
              type === "SCHEDULE" && emitter_id === scheduleId,
          )
          if (!event) return
          Object.assign(event.event_values as Record<string, unknown>, {
            week_segment: update.week_segment.name,
            day_segment: update.day_segment.name,
            priority: update.priority.name,
            visit_from_datetime: update.visit_from_datetime,
          })
        },
      )
    },
  })
}

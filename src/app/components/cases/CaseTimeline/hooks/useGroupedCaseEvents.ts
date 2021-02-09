import { useCaseEvents } from "app/state/rest"
import { TimelineEventItem } from "../TimelineEvent"

export default (caseId: Components.Schemas.CaseEvent["id"]) => {

  const { data } = useCaseEvents(caseId)

  const allEventsInTime = data?.reduce((acc, item, index) => {
    const last = acc[acc.length - 1]
    if (last?.type !== item.type) {
      acc.push({ index, type: item.type, eventList: [item] })
    } else {
      last.eventList.push(item)
    }
    return acc
  }, [] as TimelineEventItem[])

  return allEventsInTime ?? []
}

import { useCaseEvents } from "app/state/rest"
import { TimelineEventItem } from "../TimelineEvent"

type CaseEvent = Components.Schemas.CaseEvent

const shouldBeGrouped = (item: CaseEvent) => item.type !== "GENERIC_TASK"
const equalItems = (i: TimelineEventItem | undefined, ii: CaseEvent) => i !== undefined && i.type === ii.type

export default (caseId: CaseEvent["id"]) => {

  const { data } = useCaseEvents(caseId)

  return data?.reduce((acc, item) => {

    const last = acc[acc.length - 1]

    // group
    if (shouldBeGrouped(item) && equalItems(last, item)) {
      last.eventList.push(item)
    }
    // new row
    else {
      acc.push({ type: item.type, eventList: [item] })
    }

    return acc
  }, [] as TimelineEventItem[])
}

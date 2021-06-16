import { useCaseEvents } from "app/state/rest"

type TimelineEventItem = {
  type: Components.Schemas.TypeEnum
  caseEvents: Components.Schemas.CaseEvent[]
}

const shouldBeGrouped = (item: Components.Schemas.CaseEvent) => item.type !== "GENERIC_TASK"
const equalItems = (i: TimelineEventItem | undefined, ii: Components.Schemas.CaseEvent) => i !== undefined && i.type === ii.type

export default (caseId: Components.Schemas.CaseEvent["id"]) => {

  const [data, methods, errors] = useCaseEvents(caseId)

  return [
    data?.reduce((acc, item) => {

      const last = acc[acc.length - 1]

      // group
      if (shouldBeGrouped(item) && equalItems(last, item)) {
        last.caseEvents.push(item)
      }
      // new row
      else {
        acc.push({ type: item.type, caseEvents: [item] })
      }

      return acc
    }, [] as TimelineEventItem[]),
    methods,
    errors
  ] as const
}

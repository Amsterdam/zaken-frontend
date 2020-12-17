import { useCaseEvents } from "app/state/rest"

type EventProps = {
  index: number
  type: string
  eventList: Components.Schemas.CaseEvent[]
}

export default (caseId: Components.Schemas.CaseEvent["id"]) => {

  const { data } = useCaseEvents(caseId)
  
  const allEventsInTime = data?.reduce((acc, item, index) => {
    if (acc[index - 1]?.type !== item.type) {
      acc.push({ index, type: item.type, eventList: [item] })
    } else {
      acc[index - 1].eventList.push(item)
    }
    return acc
  }, [] as EventProps[])

  return allEventsInTime ?? []
}

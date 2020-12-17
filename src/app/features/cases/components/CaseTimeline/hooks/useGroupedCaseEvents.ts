import { useCaseEvents } from "app/state/rest"

type EventProps = {
  index: number
  type: string
  eventList: Components.Schemas.CaseEvent[]
}

export default (caseId: Components.Schemas.CaseEvent["id"]) => {

  const { data } = useCaseEvents(caseId)

  let currentIndex = -1
  let currentType = ""
  let previousType = ""
  const allEventsInTime: EventProps[] = []

  const startNewEventList = (event: Components.Schemas.CaseEvent) => {
    previousType = currentType
    currentIndex++
    allEventsInTime.push({ index: currentIndex, type: currentType, eventList: [event] })
  }

  const addEventToList = (event: Components.Schemas.CaseEvent) => {
    allEventsInTime[currentIndex].eventList?.push(event)
  }

  const doGroupEvents = (item: Components.Schemas.CaseEvent) => {
    currentType = item.type
    currentType !== previousType ?
      startNewEventList(item) :
      addEventToList(item)
  }

  // TODO order list by date
  data?.forEach(doGroupEvents)

  return allEventsInTime
}

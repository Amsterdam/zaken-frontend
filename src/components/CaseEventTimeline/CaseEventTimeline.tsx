import { useMemo } from "react"
import { ProgressList, Heading } from "@amsterdam/design-system-react"
import { Description } from "@/components/Description/Description"
import { EVENT_CONFIG } from "./config/eventConfig"
import { buildDescriptionData } from "./utils/buildDescriptionData"

/**
 * The events of a case, latest first. Every event can be opened and closed;
 * only the latest is open, so the whole history fits in a short list.
 */
export function CaseEventTimeline({ data }: { data?: CaseEvent[] }) {
  // Sort events by ID descending
  const events = useMemo(
    () => (data ? [...data].sort((a, b) => b.id - a.id) : []),
    [data],
  )

  // Count total occurrences per type (excluding GENERIC_TASK)
  const totalCountPerType = useMemo(() => {
    const counts: Record<string, number> = {}

    for (const event of events) {
      if (event.type === "GENERIC_TASK") continue
      counts[event.type] = (counts[event.type] ?? 0) + 1
    }

    return counts
  }, [events])

  // Group only consecutive events with the same type (except GENERIC_TASK)
  const groupedEvents = useMemo(() => {
    const groups: CaseEvent[][] = []
    let currentGroup: CaseEvent[] = []

    for (const event of events) {
      if (currentGroup.length === 0) {
        currentGroup.push(event)
        continue
      }

      const prevEvent = currentGroup[currentGroup.length - 1]

      if (event.type === prevEvent.type && event.type !== "GENERIC_TASK") {
        currentGroup.push(event)
      } else {
        groups.push(currentGroup)
        currentGroup = [event]
      }
    }

    if (currentGroup.length > 0) {
      groups.push(currentGroup)
    }

    return groups
  }, [events])

  return (
    <ProgressList headingLevel={3} collapsible>
      {groupedEvents.map((group, groupIndex) => {
        const firstEvent = group[0]
        const config = EVENT_CONFIG[firstEvent.type]
        if (!config) return null

        const baseTitle =
          typeof config.title === "function"
            ? config.title(firstEvent)
            : config.title

        const stepCount = firstEvent.type === "GENERIC_TASK" ? 0 : group.length

        const totalCount = totalCountPerType[firstEvent.type] ?? 0

        const title =
          totalCount > 1 && stepCount > 0
            ? `${baseTitle} (${stepCount}/${totalCount})`
            : baseTitle

        // Single event or GENERIC_TASK → normal Step
        if (group.length === 1 || firstEvent.type === "GENERIC_TASK") {
          const event = firstEvent
          const descriptionData = buildDescriptionData(event, config)

          return (
            <ProgressList.Step
              key={event.id}
              heading={title}
              status={groupIndex === 0 ? "current" : "completed"}
            >
              <Description data={descriptionData} termsWidth="narrow" />
            </ProgressList.Step>
          )
        }

        // Multiple consecutive events → Step with Substeps
        return (
          <ProgressList.Step
            key={firstEvent.id}
            heading={title}
            status={groupIndex === 0 ? "current" : "completed"}
            hasSubsteps
          >
            <ProgressList.Substeps>
              {group.map((event) => {
                const descriptionData = buildDescriptionData(event, config)

                const dateItem = descriptionData.find(
                  (item) => item.label === "Datum",
                )

                const rest = descriptionData.filter(
                  (item) => item.label !== "Datum",
                )

                return (
                  <ProgressList.Substep key={event.id} status="completed">
                    {dateItem && (
                      <Heading level={3} className="ams-mb-s">
                        {dateItem.value}
                      </Heading>
                    )}

                    <Description data={rest} termsWidth="narrow" />
                  </ProgressList.Substep>
                )
              })}
            </ProgressList.Substeps>
          </ProgressList.Step>
        )
      })}
    </ProgressList>
  )
}

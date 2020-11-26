export const visitIsDone = (caseEvents: Components.Schemas.CaseEvent[]) =>
  caseEvents
    .filter(({ type }) => type === "VISIT")
    .filter(({ event_values }) => event_values.situation === "access_granted").length > 0

export const debriefIsDone = (caseEvents: Components.Schemas.CaseEvent[]) =>
  caseEvents[0].type === "DEBRIEFING" &&
  (caseEvents[0].event_values.violation === "YES" || caseEvents[0].event_values.violation === "NO")
  
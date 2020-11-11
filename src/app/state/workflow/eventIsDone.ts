export const visitIsDone = (caseEvents: Components.Schemas.CaseEvent[]) =>
  caseEvents
    .filter(({ type }) => type === "VISIT")
    .filter(({ event_values }) => event_values.situation === "access_granted").length > 0

export const debriefIsDone = (caseEvents: Components.Schemas.CaseEvent[]) =>
caseEvents
  .filter(({ type }) => type === "DEBRIEFING")
  .filter(({ event_values }) => event_values.violation === "ADDITIONAL_RESEARCH_REQUIRED")
  .length === 0
  
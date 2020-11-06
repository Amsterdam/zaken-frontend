export default (caseEvents: Components.Schemas.CaseEvent[]) =>
  caseEvents
    .filter(({ type }) => type === "VISIT")
    .filter(({ event_values }) => event_values.situation === "access_granted").length === 0

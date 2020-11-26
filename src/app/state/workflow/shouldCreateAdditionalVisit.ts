export default (caseEvents: Components.Schemas.CaseEvent[], checkShowAsNextStep?: boolean) =>
  
  caseEvents
    .filter(({ type }) => type === "DEBRIEFING")
    .filter(({ event_values }) => event_values.violation === "ADDITIONAL_VISIT_REQUIRED").length > 0 
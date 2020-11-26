export default (caseEvents: Components.Schemas.CaseEvent[], checkShowAsNextStep?: boolean) => 
  caseEvents[0].type === "DEBRIEFING" &&
  caseEvents
    .filter(({ type }) => type === "DEBRIEFING").length > 0 &&
  caseEvents
    .filter(({ type }) => type === "DEBRIEFING")[0].event_values.violation === "ADDITIONAL_VISIT_REQUIRED"

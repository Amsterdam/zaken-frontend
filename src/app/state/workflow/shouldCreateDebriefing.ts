export default (caseEvents: Components.Schemas.CaseEvent[], checkShowAsNextStep?: boolean) =>
  checkShowAsNextStep 
    ? (caseEvents[0].type === "VISIT" &&
      caseEvents[0].event_values.situation === "access_granted")
    : (caseEvents[0].type === "VISIT" &&
      caseEvents[0].event_values.situation === "access_granted")
      ||
      (caseEvents[0].type === "DEBRIEFING" &&
      caseEvents[0].event_values.violation === "ADDITIONAL_RESEARCH_REQUIRED")

      
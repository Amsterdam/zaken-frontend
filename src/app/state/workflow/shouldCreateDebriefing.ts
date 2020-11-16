export default (caseEvents: Components.Schemas.CaseEvent[], checkShowAsNextStep?: boolean) =>
  
  checkShowAsNextStep 
    ? caseEvents
      .filter(({ type }) => type === "VISIT")
      .filter(({ event_values }) => event_values.situation === "access_granted").length > 0 &&
      caseEvents
      .filter(({ type }) => type === "DEBRIEFING").length === 0
      
    : caseEvents
      .filter(({ type }) => type === "VISIT")
      .filter(({ event_values }) => event_values.situation === "access_granted").length > 0 &&
      caseEvents
      .filter(({ type }) => type === "DEBRIEFING")
      .filter(({ event_values }) => event_values.violation !== "ADDITIONAL_RESEARCH_REQUIRED").length === 0
      
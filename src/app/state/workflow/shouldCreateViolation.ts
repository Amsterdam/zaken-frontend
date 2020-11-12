export default (caseEvents: Components.Schemas.CaseEvent[], checkShowAsNextStep?: boolean) =>
  
  checkShowAsNextStep 
    ? caseEvents
      .filter(({ type }) => type === "DEBRIEFING")
      .filter(({ event_values }) => event_values.violation === "YES").length > 0 
      
    : caseEvents
      .filter(({ type }) => type === "DEBRIEFING")
      .filter(({ event_values }) => event_values.violation === "YES").length > 0
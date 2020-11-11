export default (caseEvents: Components.Schemas.CaseEvent[], checkShowAsNextStep?: boolean) =>
checkShowAsNextStep 
? caseEvents
  .filter(({ type }) => type === "VISIT").length === 0
: caseEvents
  .filter(({ type }) => type === "VISIT")
  .filter(({ event_values }) => event_values.situation === "access_granted").length === 0

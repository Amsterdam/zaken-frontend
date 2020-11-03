export default (caseEvents: Components.Schemas.CaseEvent[] = []) =>
  caseEvents.filter(({ type }) => type === "VISIT").length > 0 &&
  caseEvents.filter(({ type }) => type === "DEBRIEFING").length === 0

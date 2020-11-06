import shouldCreateVisit from "./shouldCreateVisit"
import shouldCreateDebriefing from "./shouldCreateDebriefing"
import shouldCloseCase from "./shouldCloseCase"

export default (caseEvents?: Components.Schemas.CaseEvent[]) => ({
    shouldCreateVisit: caseEvents === undefined ? false : shouldCreateVisit(caseEvents),
    shouldCreateDebriefing: caseEvents === undefined ? false : shouldCreateDebriefing(caseEvents),
    shouldCloseCase: caseEvents === undefined ? false : shouldCloseCase(caseEvents)
  })

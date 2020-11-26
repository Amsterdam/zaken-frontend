import shouldCreateVisit from "./shouldCreateVisit"
import shouldCreateDebriefing from "./shouldCreateDebriefing"
import shouldCloseCase from "./shouldCloseCase"
import { debriefIsDone, visitIsDone } from "./eventIsDone"
import shouldCreateViolation from "./shouldCreateViolation"
import shouldCreateAdditionalVisit from "./shouldCreateAdditionalVisit"

export default (caseEvents?: Components.Schemas.CaseEvent[], checkShowAsNextStep?: boolean) => ({
    shouldCreateVisit: caseEvents === undefined ? false : shouldCreateVisit(caseEvents, checkShowAsNextStep),
    shouldCreateDebriefing: caseEvents === undefined ? false : shouldCreateDebriefing(caseEvents, checkShowAsNextStep),
    shouldCreateViolation: caseEvents === undefined ? false : shouldCreateViolation(caseEvents, checkShowAsNextStep),
    shouldCloseCase: caseEvents === undefined ? false : shouldCloseCase(caseEvents),
    visitIsDone: caseEvents === undefined ? false : visitIsDone(caseEvents),
    debriefIsDone: caseEvents === undefined ? false : debriefIsDone(caseEvents),
    shouldCreateAdditionalVisit: caseEvents === undefined ? false : shouldCreateAdditionalVisit(caseEvents)
  })

type WorkflowType = components["schemas"]["WorkflowTypeEnum"]

/** What the workflows (BPMN models) of the backend are called in Dutch. */
export const workflowTypeNames: Record<WorkflowType, string> = {
  main_workflow: "?",
  sub_workflow: "Deelproces",
  director: "Hoofdproces",
  visit: "Huisbezoek",
  debrief: "Debriefing",
  summon: "Aanschrijving",
  decision: "Besluit",
  renounce_decision: "Afzien van besluit",
  closing_procedure: "Sluitingsprocedure",
  close_case: "Zaak afsluiten",
  omzettingsvergunning: "Omzettingsvergunning",
  digital_surveillance: "Digitaal toezicht",
  housing_corporation: "Woningcorporatie",
  unoccupied: "Leegstand",
  citizen_report_feedback: "Terugkoppeling SIG-melding",
}

type TaskAction = {
  name: string
  target: string
  disabled?: boolean
}

const taskActionMap: Record<string, TaskAction> = {
  task_create_schedule: { name: 'Bezoek inplannen', target: 'inplanning' },
  task_create_visit: { name: 'Doorgeven bezoek TOP', target: 'huisbezoek', disabled: true },
  task_create_debrief: { name: 'Debrief verwerken', target: 'debriefing' },
  task_create_summon: { name: 'Aanschrijving verwerken', target: 'aanschrijving' },
  task_create_decision: { name: 'Besluit verwerken', target: 'besluit' },
  task_create_signal: { name: 'Melding verwerken', target: 'melding' },
  task_close_case: { name: 'Zaak afsluiten', target: 'afronding' },
  // TODO 19-07-2021 remove next line when it is sure no older camunda-processes use "create_case_closing" anymore
  create_case_closing: { name: 'Zaak afsluiten', target: 'afronding' },
};

export default taskActionMap;

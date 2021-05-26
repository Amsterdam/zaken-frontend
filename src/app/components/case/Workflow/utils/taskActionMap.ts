type TaskAction = {
  name: string
  target: string
  disabled?: boolean
}

const taskActionMap: Record<string, TaskAction> = {
  task_create_schedule: { name: "Huisbezoek inplannen", target: "inplanning" },
  task_create_visit: { name: "Doorgeven huisbezoek TOP", target: "huisbezoek", disabled: true },
  task_create_debrief: { name: "Debrief verwerken", target: "debriefing" },
  task_create_summon: { name: "Aanschrijving verwerken", target: "aanschrijving" },
  task_create_decision: { name: "Besluit verwerken", target: "besluit" },
  task_create_signal: { name: "Melding verwerken", target: "melding" }
}

export default taskActionMap
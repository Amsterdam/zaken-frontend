import { StandaloneLink } from "@amsterdam/design-system-react"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import { type ColumnType } from "@/components/Table/types"
import { workflowTypeNames } from "@/shared/constants/workflowTypes"
import { renderStatusBadge } from "@/shared/renderStatusBadge"
import { formatWorkflowType } from "@/shared/textFormatters"

type WorkflowInstance = components["schemas"]["CaseWorkflowInstance"]

const columns: ColumnType<WorkflowInstance>[] = [
  {
    header: "Proces",
    dataIndex: "workflow_type",
    render: (_, { workflow_type }) =>
      workflow_type ? formatWorkflowType(workflow_type) : "-",
  },
  {
    header: "Omschrijving",
    render: (_, { workflow_type }) =>
      (workflow_type && workflowTypeNames[workflow_type]) ?? "-",
  },
  {
    header: "Versie",
    dataIndex: "workflow_version",
  },
  {
    header: "Status",
    dataIndex: "completed",
    render: (_, { completed }) =>
      completed
        ? renderStatusBadge("Afgerond", { variant: "success" })
        : renderStatusBadge("Actief", { variant: "info" }),
  },
  {
    // The diagram of the workflow, with the open tasks highlighted.
    dataIndex: "current_task_specs",
    noWrap: true,
    render: (_, { workflow_type, workflow_version, current_task_specs }) => {
      if (!workflow_type || !workflow_version) return null

      const hasCurrentTasks = current_task_specs.length > 0
      const search = new URLSearchParams({
        model: workflow_type,
        versie: workflow_version,
        ...(hasCurrentTasks && { taken: current_task_specs.join(",") }),
      })
      const label = hasCurrentTasks
        ? "Bekijk huidige processtap"
        : "Bekijk het proces"

      return (
        <StandaloneLink
          linkComponent={RouterLink}
          href={`/bpmn?${search.toString()}`}
          aria-label={`${label}: ${formatWorkflowType(workflow_type)} ${workflow_version}`}
        >
          {label}
        </StandaloneLink>
      )
    },
  },
]

export default columns

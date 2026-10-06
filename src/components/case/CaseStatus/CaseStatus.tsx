import { useState } from "react"
import { useLocation, useSearchParams } from "react-router"
import { Button, Tabs } from "@amsterdam/design-system-react"
import { ClipboardIcon } from "@amsterdam/design-system-react-icons"
import { Card } from "@/components/Card/Card"
import useHasPermission, { CAN_PERFORM_TASK } from "@/hooks/useHasPermission"
import TaskDialog from "../forms/TaskForm/TaskDialog"
import Workflow from "../Workflow/Workflow"
import WorkflowInstances from "../WorkflowInstances/WorkflowInstances"

// The open tab lives in the URL, so it is still open when you come back.
const TAB_PARAM = "tab"
const TASKS_TAB = "open-taken"
const WORKFLOWS_TAB = "processen"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
}

const CaseStatus: React.FC<Props> = ({ id }) => {
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { state } = useLocation()
  const activeTab =
    searchParams.get(TAB_PARAM) === WORKFLOWS_TAB ? WORKFLOWS_TAB : TASKS_TAB

  const onTabChange = (tab: string) =>
    setSearchParams(
      (params) => {
        // The first tab is the default: it stays out of the URL.
        if (tab === TASKS_TAB) params.delete(TAB_PARAM)
        else params.set(TAB_PARAM, tab)
        return params
      },
      // Switching tabs is no step in the history, and the breadcrumbs keep
      // where you came from.
      { replace: true, state },
    )

  return (
    <Card
      title="Taken en processen"
      icon={ClipboardIcon}
      headingLevel={2}
      actions={
        <Button
          variant="secondary"
          disabled={!hasPermission}
          title={
            hasPermission ? undefined : "U heeft geen permissie tot deze actie"
          }
          onClick={() => setIsTaskDialogOpen(true)}
          data-testid="btn_add_extra_task"
        >
          Taak opvoeren
        </Button>
      }
    >
      <Tabs activeTab={activeTab} onTabChange={onTabChange}>
        <Tabs.List>
          <Tabs.Button aria-controls={TASKS_TAB}>Open taken</Tabs.Button>
          <Tabs.Button aria-controls={WORKFLOWS_TAB}>Processen</Tabs.Button>
        </Tabs.List>
        <Tabs.Panel id={TASKS_TAB}>
          <Workflow id={id} />
        </Tabs.Panel>
        {/* Only the panel of the chosen tab is rendered: the processes are
            fetched when you open their tab. */}
        <Tabs.Panel id={WORKFLOWS_TAB}>
          <WorkflowInstances caseId={id} />
        </Tabs.Panel>
      </Tabs>
      {isTaskDialogOpen && (
        <TaskDialog id={id} onClose={() => setIsTaskDialogOpen(false)} />
      )}
    </Card>
  )
}

export default CaseStatus

import { useState } from "react"
import { IconButton, Row } from "@amsterdam/design-system-react"
import { PencilIcon } from "@amsterdam/design-system-react-icons"
import {
  type CaseSchedule,
  useSchedulesByCaseId,
  useScheduleTypes,
} from "@/api/hooks"
import useHasPermission, { CAN_PERFORM_TASK } from "@/hooks/useHasPermission"
import UpdateScheduleDialog from "./UpdateScheduleDialog"

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"]
  themeId?: number
}

const getLatestSchedule = (schedules?: CaseSchedule[]): CaseSchedule | null => {
  if (!schedules || schedules.length === 0) return null

  return schedules.reduce((latest, current) =>
    new Date(current.date_modified) > new Date(latest.date_modified)
      ? current
      : latest,
  )
}

/**
 * The urgency of the visit of a case; who may perform tasks can change the
 * planning of the visit with the button next to it.
 */
const UpdateSchedule: React.FC<Props> = ({ caseId, themeId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])
  const { data: schedules } = useSchedulesByCaseId(caseId)
  const latestSchedule = getLatestSchedule(schedules)
  // The choices of the form: there before the dialog opens, so it opens at once.
  const { data: scheduleTypes } = useScheduleTypes(themeId, {
    enabled: hasPermission && latestSchedule !== null,
  })

  const priorityName = latestSchedule?.priority?.name ?? "-"

  if (!hasPermission || !latestSchedule || !scheduleTypes) return priorityName

  return (
    <>
      <Row gap="small" alignVertical="center">
        {priorityName}
        <IconButton
          label="Pas de planning van het bezoek aan"
          svg={PencilIcon}
          onClick={() => setIsOpen(true)}
        />
      </Row>
      {isOpen && (
        <UpdateScheduleDialog
          caseId={caseId}
          schedule={latestSchedule}
          scheduleTypes={scheduleTypes}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default UpdateSchedule

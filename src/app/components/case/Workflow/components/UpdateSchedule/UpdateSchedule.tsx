import { useEffect } from "react"

import { useModal } from "app/components/shared/Modal/hooks/useModal"
import {
  useSchedule,
  useSchedulesByCaseId,
  useScheduleTypes,
} from "app/state/rest"
import useHasPermission, {
  CAN_PERFORM_TASK,
} from "app/state/rest/custom/usePermissions/useHasPermission"
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon"
import UpdateScheduleModal from "./UpdateScheduleModal"
import type { Schedule } from "./types"

import styles from "./UpdateSchedule.module.css"

type Props = {
  caseId: Components.Schemas.CaseDetail["id"]
  themeId?: number
};

const getLatestSchedule = (schedules?: Schedule[]): Schedule | null => {
  if (!schedules || schedules.length === 0) return null

  return schedules.reduce<Schedule | null>((latest, current) => {
    if (!latest) return current

    return new Date(current.date_modified) > new Date(latest.date_modified)
      ? current
      : latest
  }, null)
}

const UpdateSchedule: React.FC<Props> = ({ caseId, themeId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [schedules] = useSchedulesByCaseId(caseId)
  const latestSchedule = getLatestSchedule(schedules as unknown as Schedule[])
  const [, { execPatch: updateSchedule }] = useSchedule(latestSchedule?.id)
  const [scheduleTypes, { execGet: getScheduleTypes }] = useScheduleTypes(
    themeId,
    { lazy: true },
  )
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK])

  useEffect(() => {
    if (isModalOpen) {
      getScheduleTypes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen])

  const onSubmit = (data: any) => {
    updateSchedule(data)
  }

  const priorityName = latestSchedule?.priority?.name ?? "-"

  return hasPermission ? (
    <>
      <span className={styles.link} role="link" onClick={openModal}>
        {priorityName}
        <span className={styles.icon}>
          <CustomIcon
            name="Edit"
            titleAccess="Pas de planning van een bezoek aan"
          />
        </span>
      </span>
      {latestSchedule && scheduleTypes && (
        <UpdateScheduleModal
          onSubmit={onSubmit}
          isOpen={isModalOpen}
          closeModal={closeModal}
          schedule={latestSchedule}
          scheduleTypes={scheduleTypes}
        />
      )}
    </>
  ) : (
    <span>{priorityName}</span>
  )
}

export default UpdateSchedule

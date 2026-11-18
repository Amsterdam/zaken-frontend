import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useAssignTask, useUsersMe } from "@/api/hooks"
import useHasPermission, {
  CAN_ASSIGN_TASK_TO_OTHERS,
  CAN_PERFORM_TASK,
} from "@/hooks/useHasPermission"
import useAnchoredPosition from "@/hooks/useAnchoredPosition"
import AssigneeAvatar from "./AssigneeAvatar"
import UserPickerDropdown from "./UserPickerDropdown"
import ConfirmReassignDialog from "./ConfirmReassignDialog"
import styles from "./AssignTask.module.css"

// An estimate, only to choose between opening below or above the avatar: the
// search field, two shortcuts and at most 220px of users.
const DROPDOWN_MAX_HEIGHT = 360

type Props = {
  taskId: Tasks.TaskId
  taskOwner?: string | null
}

const AssignTask: React.FC<Props> = ({ taskId, taskOwner }) => {
  const [hasPerformTaskPermission] = useHasPermission([CAN_PERFORM_TASK])
  const [canAssignTaskToOthers] = useHasPermission([CAN_ASSIGN_TASK_TO_OTHERS])

  const [pendingUserId, setPendingUserId] = useState<string | null | undefined>(
    undefined,
  )
  const [confirmOpen, setConfirmOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const {
    position: dropdownPosition,
    open: openDropdown,
    close: closeDropdown,
  } = useAnchoredPosition(containerRef, DROPDOWN_MAX_HEIGHT)
  const dropdownOpen = dropdownPosition !== null

  const { data: currentUser, isLoading: isMeBusy } = useUsersMe()
  const currentUserId = currentUser?.id ?? null
  // Updates the owner wherever the task is shown: the overview and the case page.
  const { mutate: assignTask, isPending } = useAssignTask(taskId)

  const canChangeOwner = (newOwner: string | null) => {
    if (canAssignTaskToOthers) {
      return true
    }
    return newOwner !== null && newOwner === currentUserId
  }

  // Close on a click outside. Scrolling keeps the dropdown open: it stays next
  // to its cell, also when that scrolls out of view.
  useEffect(() => {
    if (!dropdownOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const insideContainer = containerRef.current?.contains(target)
      const insideDropdown = dropdownRef.current?.contains(target)
      if (!insideContainer && !insideDropdown) {
        closeDropdown()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownOpen, closeDropdown])

  const applyOwnerChange = (newOwner: string | null) => {
    closeDropdown()
    assignTask(newOwner)
  }

  const handleUserSelect = (userId: string | null) => {
    if (!canChangeOwner(userId)) {
      closeDropdown()
      return
    }

    if (userId === null) {
      applyOwnerChange(null)
      return
    }
    if (userId === taskOwner) {
      closeDropdown()
      return
    }
    if (taskOwner && taskOwner !== userId) {
      setPendingUserId(userId)
      setConfirmOpen(true)
      closeDropdown()
      return
    }
    applyOwnerChange(userId)
  }

  const handleConfirmReassign = () => {
    if (pendingUserId !== undefined) {
      applyOwnerChange(pendingUserId)
    }
    setConfirmOpen(false)
    setPendingUserId(undefined)
  }

  const handleCancelReassign = () => {
    setConfirmOpen(false)
    setPendingUserId(undefined)
  }

  const handleAvatarClick = () => {
    if (dropdownOpen) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }

  if (!hasPerformTaskPermission) {
    return <span className={styles.noPermission}>-</span>
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <AssigneeAvatar
        taskOwner={taskOwner ?? null}
        currentUserId={currentUser?.id ?? null}
        currentUser={currentUser ?? null}
        isBusy={isMeBusy || isPending}
        onClick={handleAvatarClick}
      />

      {dropdownPosition &&
        createPortal(
          <UserPickerDropdown
            currentUserId={currentUserId}
            currentOwnerId={taskOwner ?? null}
            canAssignToOthers={canAssignTaskToOthers}
            onSelect={handleUserSelect}
            onClose={closeDropdown}
            position={dropdownPosition}
            dropdownRef={dropdownRef}
          />,
          document.body,
        )}

      {confirmOpen && (
        <ConfirmReassignDialog
          pendingUserId={pendingUserId ?? null}
          onConfirm={handleConfirmReassign}
          onCancel={handleCancelReassign}
        />
      )}
    </div>
  )
}

export default AssignTask

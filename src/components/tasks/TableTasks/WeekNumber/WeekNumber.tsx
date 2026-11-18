import { useEffect, useMemo, useRef } from "react"
import { createPortal } from "react-dom"
import { Icon } from "@amsterdam/design-system-react"
import { ChevronDownIcon } from "@amsterdam/design-system-react-icons"
import { useAssignTaskWeek } from "@/api/hooks"
import useAnchoredPosition from "@/hooks/useAnchoredPosition"
import {
  getCurrentIsoWeekNumber,
  getSortedWeekNumbers,
} from "@/components/tasks/weekNumbers"
import WeekPicker, { PICKER_MAX_HEIGHT } from "./WeekPicker"
import styles from "./WeekNumber.module.css"

type Props = {
  canEdit: boolean
  taskId: Tasks.TaskId
  value: number | null
}

// Shows the week as text. A user who may change it clicks the text to open a
// list of weeks, so the table does not show a select in every row.
const WeekNumber: React.FC<Props> = ({ canEdit, taskId, value }) => {
  const currentWeek = useMemo(() => getCurrentIsoWeekNumber(), [])
  const weekOptions = useMemo(
    () => getSortedWeekNumbers(currentWeek),
    [currentWeek],
  )
  const { mutate, isPending, variables } = useAssignTaskWeek(taskId)
  const assignTaskWeek = mutate as (weekNumber: number | null) => void
  // While saving, show the chosen week already. On an error it goes back.
  const shownValue = isPending ? (variables ?? null) : value

  const buttonRef = useRef<HTMLButtonElement>(null)
  const pickerRef = useRef<HTMLUListElement>(null)
  const {
    position,
    open,
    close: closePicker,
  } = useAnchoredPosition(buttonRef, PICKER_MAX_HEIGHT)
  const isOpen = position !== null

  const close = (returnFocus: boolean) => {
    closePicker()
    if (returnFocus) buttonRef.current?.focus()
  }

  // Close on a click outside. Scrolling keeps the list open: it stays next to
  // its cell, also when that scrolls out of view.
  useEffect(() => {
    if (!isOpen) return
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        !buttonRef.current?.contains(target) &&
        !pickerRef.current?.contains(target)
      ) {
        closePicker()
      }
    }
    document.addEventListener("mousedown", handleMouseDown)
    return () => document.removeEventListener("mousedown", handleMouseDown)
  }, [isOpen, closePicker])

  if (!canEdit) {
    return <span>{value ?? "-"}</span>
  }

  const handleSelect = (nextWeek: number | null) => {
    close(true)
    if (nextWeek !== value) {
      assignTaskWeek(nextWeek)
    }
  }

  const week = shownValue === null ? "geen week" : `week ${shownValue}`
  const label = isPending
    ? `Weeknummer voor taak ${taskId}: ${week}, opslaan…`
    : `Weeknummer voor taak ${taskId}: ${week}, wijzigen`

  return (
    <>
      {/* aria-disabled instead of disabled, so the button keeps its focus. */}
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        aria-disabled={isPending}
        aria-busy={isPending}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          if (isPending) return
          if (isOpen) {
            close(false)
          } else {
            open()
          }
        }}
      >
        <span className={styles.value}>{shownValue ?? "-"}</span>
        {isPending ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          <Icon svg={ChevronDownIcon} size="small" className={styles.icon} />
        )}
      </button>

      {position &&
        createPortal(
          <WeekPicker
            ref={pickerRef}
            label={`Week kiezen voor taak ${taskId}`}
            value={value}
            currentWeek={currentWeek}
            weekOptions={weekOptions}
            position={position}
            onSelect={handleSelect}
            onClose={() => close(true)}
          />,
          document.body,
        )}
    </>
  )
}

export default WeekNumber

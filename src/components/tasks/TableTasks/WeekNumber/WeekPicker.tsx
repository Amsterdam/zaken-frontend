import { useEffect, useRef } from "react"
import {
  type AnchoredPosition,
  getAnchoredStyle,
} from "@/hooks/useAnchoredPosition"
import styles from "./WeekNumber.module.css"

// Keep in sync with max-height of .picker.
export const PICKER_MAX_HEIGHT = 256

type Props = {
  ref: React.RefObject<HTMLUListElement | null>
  label: string
  value: number | null
  currentWeek: number
  weekOptions: number[]
  position: AnchoredPosition
  onSelect: (weekNumber: number | null) => void
  onClose: () => void
}

const WeekPicker: React.FC<Props> = ({
  ref,
  label,
  value,
  currentWeek,
  weekOptions,
  position,
  onSelect,
  onClose,
}) => {
  const options: (number | null)[] = [null, ...weekOptions]
  const optionRefs = useRef<(HTMLLIElement | null)[]>([])

  // Start at the chosen week, so the keyboard continues from there.
  useEffect(() => {
    const selectedIndex = Math.max(options.indexOf(value), 0)
    optionRefs.current[selectedIndex]?.focus()
    // Only when the list opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const focusOption = (index: number) => {
    const last = options.length - 1
    optionRefs.current[Math.min(Math.max(index, 0), last)]?.focus()
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        focusOption(index + 1)
        break
      case "ArrowUp":
        event.preventDefault()
        focusOption(index - 1)
        break
      case "Home":
        event.preventDefault()
        focusOption(0)
        break
      case "End":
        event.preventDefault()
        focusOption(options.length - 1)
        break
      case "Enter":
      case " ":
        event.preventDefault()
        onSelect(options[index])
        break
      case "Escape":
      case "Tab":
        event.preventDefault()
        onClose()
        break
    }
  }

  return (
    <ul
      ref={ref}
      className={styles.picker}
      style={getAnchoredStyle(position)}
      role="listbox"
      aria-label={label}
    >
      {options.map((weekNumber, index) => {
        const isSelected = weekNumber === value
        return (
          <li
            key={weekNumber ?? "none"}
            ref={(element) => {
              optionRefs.current[index] = element
            }}
            className={styles.option}
            role="option"
            aria-selected={isSelected}
            tabIndex={-1}
            onClick={() => onSelect(weekNumber)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {weekNumber === null ? "Geen week" : `Week ${weekNumber}`}
            {weekNumber === currentWeek && (
              <span className={styles.hint}> (deze week)</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default WeekPicker

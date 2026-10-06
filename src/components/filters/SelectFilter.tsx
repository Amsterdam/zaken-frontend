import { useId } from "react"
import { Field, Label, Select } from "@amsterdam/design-system-react"
import styles from "./filters.module.css"

export type Option = { label: string; value: string }

type Props = {
  label: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

/** A filter with one choice. Applies as soon as you choose. */
export function SelectFilter({
  label,
  options,
  value,
  onChange,
  disabled,
}: Props) {
  const id = useId()

  return (
    <Field className={styles.field}>
      <Label htmlFor={id}>{label}</Label>
      <Select
        id={id}
        className={styles.select}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.currentTarget.value)}
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Field>
  )
}

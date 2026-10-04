import { useId } from "react"
import { Field, Label } from "@amsterdam/design-system-react"
import { SelectInput } from "@amsterdam/ee-ads-rhf"
import { type Option } from "./SelectFilter"
import styles from "./filters.module.css"

type Props = {
  label: string
  options: Option[]
  /** The values of the chosen options. */
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
}

/**
 * A filter with several choices: the searchable multiselect (react-select) of
 * @amsterdam/ee-ads-rhf. Applies as soon as you choose.
 */
export function MultiSelectFilter({
  label,
  options,
  value,
  onChange,
  placeholder = "Alle",
  disabled,
}: Props) {
  const id = useId()

  return (
    <Field className={styles.multiSelect}>
      <Label htmlFor={id}>{label}</Label>
      <SelectInput<true>
        isMulti
        id={id}
        options={options}
        value={options.filter((option) => value.includes(option.value))}
        onChange={(selected) =>
          onChange(
            Array.isArray(selected)
              ? selected.map((option: Option) => option.value)
              : [],
          )
        }
        placeholder={placeholder}
        isDisabled={disabled}
      />
    </Field>
  )
}

export default MultiSelectFilter

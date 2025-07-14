import { Label, Checkbox } from "@amsterdam/asc-ui"

type Props = {
  checked: boolean
  setChecked: (value: boolean) => void
}

export const NoCorporationFilter: React.FC<Props> = ({
  checked,
  setChecked
}) => (
  <Label htmlFor="housing_corporation_isnull" label="Zonder corporatie">
    <Checkbox
      id="housing_corporation_isnull"
      checked={checked}
      onChange={(e) => setChecked((e.target as HTMLInputElement).checked)}
    />
  </Label>
)

export default NoCorporationFilter

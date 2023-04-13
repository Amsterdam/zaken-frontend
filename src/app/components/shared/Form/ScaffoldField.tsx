
import { type ScaffoldAvailableFields, ScaffoldField as AmsterdamScaffoldField } from "@amsterdam/amsterdam-react-final-form"

import AutoFillButton, { type AutoFillButtonProps } from "./AutoFillButton/AutoFillButton"
import ShowHide, { type ShowHideProps } from "./ShowHide/ShowHide"

export type Field =
// NOTE: add your own custom types here:
  | { type: "AutoFillButton", props: AutoFillButtonProps }
  | { type: "ShowHide", props: ShowHideProps }
  | ScaffoldAvailableFields

type ScaffoldFieldProps = {
  field: Field
}

const ScaffoldField: React.FC<ScaffoldFieldProps> = ({ field }) => {
  switch (field.type) {
    case "AutoFillButton":
      return <AutoFillButton {...field.props} />
    case "ShowHide":
      return <ShowHide {...field.props} />
    default:
      return <AmsterdamScaffoldField field={field} />
  }
}

export default ScaffoldField

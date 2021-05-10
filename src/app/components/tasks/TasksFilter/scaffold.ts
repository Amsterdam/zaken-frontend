import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

export const ROLE = "Projectmedewerker"

const createOptions = () => ({ [ROLE]: ROLE })

export default (value: string, onChange: (value: string) => void) => {
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "rol",
        name: "role",
        optionLabelField: "title",
        options: createOptions(),
        onChange,
        value
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"
import { useUsersMe } from "app/state/rest/index"

export default (value: string, onChange: (value: string) => void) => {
  const [me] = useUsersMe()
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Taken",
        name: "pageSize",
        options: {
          "": "Alle taken",
          [me?.id || "owner" ]: "Mijn taken"
      },
        onChange,
        value
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

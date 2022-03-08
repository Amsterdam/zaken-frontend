import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const getOptions = () => ({
    10: "10",
    25: "25",
    100: "100"
})

export default (value: string, onChange: (value: string) => void) => {
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Aantal taken per pagina",
        name: "pageSize",
        options: getOptions(),
        onChange,
        value
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

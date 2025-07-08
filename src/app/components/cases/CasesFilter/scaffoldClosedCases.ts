import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const getOptions = () => ({
  open: "Open zaken",
  closed: "Gesloten zaken",
  all: "Alle zaken"
})

export default (value: string, onChange: (value: string) => void) => {
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Toon zaken",
        name: "open_cases",
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

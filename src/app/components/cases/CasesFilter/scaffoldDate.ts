import moment from "moment"
import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const DATE_FORMAT = "YYYY-MM-DD"

const getOptions = () => {
  const today = moment().format(DATE_FORMAT)
  const yesterday = moment().subtract(1, "days").format(DATE_FORMAT)
  const sevenDaysAgo = moment().subtract(7, "days").format(DATE_FORMAT)
  const thirtyDaysAgo = moment().subtract(30, "days").format(DATE_FORMAT)
  return {
    "": "Alle zaken",
   [today]: "Vandaag",
   [yesterday]: "Gisteren",
   [sevenDaysAgo]: "Laatste 7 dagen",
   [thirtyDaysAgo]: "Laatste 30 dagen"
  }
}

export default (value: string, onChange: (value: string) => void) => {
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Startdatum",
        name: "startdate",
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

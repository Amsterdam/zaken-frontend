import { displayDate } from "@amsterdam/wonen-ui"

import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

export const getDate = (backwards = 0) => {
  const d = new Date(new Date().setDate(new Date().getDate() - backwards))
  return [`${ d.getFullYear() }-${ d.getMonth() + 1 }-${ d.getDate() }`, displayDate(d)]
}

export const createOptions = () => {
  const options = [...Array(7)].reduce((acc, _, index) => {
    const [date, displayDate] = getDate(index)
    switch (index) {
      case 0: acc[date] = "Vandaag"; break
      case 1: acc[date] = "Gisteren"; break
      default: acc[date] = displayDate
    }
    return acc
  }, {} as Record<string, string>)
  options[""] = "Alle zaken"
  return options
}

export default (value: string, onChange: (value: string) => void) => {

  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Periode",
        name: "period",
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

import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"

export const getDate = (backwards = 0) => {
  const d = new Date(new Date().setDate(new Date().getDate() - backwards))
  return [`${ d.getFullYear() }-${ d.getMonth() + 1 }-${ d.getDate() }`, displayDate(d)]
}

export const createOptions = () =>
  [...Array(7)].reduce((acc, _, index) => {
    const [date, displayDate] = getDate(index)
    switch (index) {
      case 0: acc[date] = "Vandaag"; break
      case 1: acc[date] = "Gisteren"; break
      default: acc[date] = displayDate
    }
    return acc
  }, {} as Record<string, string>)

export default (value: string, onChange: (value: string) => void) => {
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Periode",
        name: "period",
        options: createOptions(),
        onChange: onChange,
        value
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

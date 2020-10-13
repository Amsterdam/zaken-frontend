import { FormPositioner } from "amsterdam-scaffold-form/package"
import { Fields } from "app/features/shared/components/molecules/Form/ScaffoldFields"

const getDate = (backwards: number) => {
  const d = new Date(new Date().setDate(new Date().getDate() - backwards))
  return `${ d.getDate() }-${ d.getMonth() + 1 }-${ d.getFullYear() }`
}

const fields = {
  period: {
    type: "RadioFields",
    props: {
      label: "Periode",
      name: "period",
      options: (() => [...Array(7)].reduce((acc, _, index) => {
          const date = getDate(index)
          switch (index) {
            case 0: acc[date] = "Vandaag"; break
            case 1: acc[date] = "Gisteren"; break
            default: acc[date] = date
          }
          return acc
        }, {} as Record<string, string>))(),
      onChange: () => console.log("change")
    }
  }
}

export default new FormPositioner(fields as Fields)
  .setVertical("mobileS")
  .getScaffoldProps()

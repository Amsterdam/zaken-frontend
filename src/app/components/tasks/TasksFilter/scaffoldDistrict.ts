import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const createOptions = (districts: Components.Schemas.District[]) => (
  districts.reduce((acc, cur) => {
    acc[cur.name] = cur.name
    return acc
  }, { "": "Alle stadsdelen" } as Record<string, string>)
)

export default (district: string, districts: Components.Schemas.District[], onChange: (value: string) => void) => {
  const sortedDistricts = districts.sort((a, b) => a.name.localeCompare(b.name))
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Stadsdeel",
        name: "district",
        optionLabelField: "name",
        options: createOptions(sortedDistricts),
        onChange,
        value: district
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

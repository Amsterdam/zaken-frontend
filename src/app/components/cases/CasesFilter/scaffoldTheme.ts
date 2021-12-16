import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

const createOptions = (themes: Components.Schemas.CaseTheme[]) => (
  themes.reduce((acc, cur) => {
    acc[cur.id] = cur.name
    return acc
  }, { "": "Alle thema's" } as Record<string, MockComponents.Schemas.Role>)
)

export default (theme: string, themes: Components.Schemas.CaseTheme[], onChange: (value: string) => void) => {
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Thema",
        name: "theme",
        optionLabelField: "name",
        options: createOptions(themes),
        onChange,
        value: theme
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

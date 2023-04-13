import { FormPositioner } from "@amsterdam/amsterdam-react-final-form"
import { type Fields } from "app/components/shared/Form/ScaffoldFields"

export const ROLE = "Projectmedewerker"

const createOptions = (themes: Components.Schemas.CaseTheme[]) =>
  themes.reduce<Record<string, MockComponents.Schemas.Role>>((acc, cur) => {
    acc[cur.name] = cur.name
    return acc
  }, { "": "Alle thema's" })

export default (theme: string, themes: Components.Schemas.CaseTheme[], onChange: (value: string) => void) => {
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Thema",
        name: "theme",
        optionLabelField: "title",
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

import { FormPositioner } from "@amsterdam/scaffold-form/package"
import { Fields } from "app/components/shared/Form/ScaffoldFields"

export const ROLE = "Projectmedewerker"

const createOptions = (roles: MockComponents.Schemas.Role[]) =>
  roles.reduce((acc, cur) => {
    acc[cur] = cur
    return acc
  }, { "": "Alle rollen" } as Record<string, MockComponents.Schemas.Role>)

export default (role: MockComponents.Schemas.Role, roles: MockComponents.Schemas.Role[], onChange: (value: string) => void) => {
  const fields = {
    period: {
      type: "RadioFields",
      props: {
        label: "Rol",
        name: "role",
        optionLabelField: "title",
        options: createOptions(roles),
        onChange,
        value: role
      }
    }
  }

  return new FormPositioner(fields as Fields)
    .setVertical("mobileS")
    .getScaffoldProps()
}

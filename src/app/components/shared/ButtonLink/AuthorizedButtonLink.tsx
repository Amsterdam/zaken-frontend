import { Button } from "@amsterdam/asc-ui"
import ButtonLink from "app/components/shared/ButtonLink/ButtonLink"
import useHasPermission from "app/state/rest/custom/usePermissions/useHasPermission"

type Props = React.ComponentProps<typeof Button> & {
  permissionName: Components.Schemas.PermissionsEnum
  to: string
  text: string
}

const AuthorizedButtonLink: React.FC<Props> = ({ to, text, permissionName, ...restProps }) => {

  const hasPermission = useHasPermission(permissionName)

  return hasPermission ?
    <ButtonLink to={ to }><Button as="span" { ...restProps }>{ text }</Button></ButtonLink> :
    <Button disabled={ true } { ...restProps } title="U heeft geen permissie tot deze actie">{ text }</Button>
}

export default AuthorizedButtonLink
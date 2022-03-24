import { Button } from '@amsterdam/asc-ui';
import ButtonLink from 'app/components/shared/ButtonLink/ButtonLink';
import useHasPermission from 'app/state/rest/custom/usePermissions/useHasPermission';

type Props = React.ComponentProps<typeof Button> & {
  permissionNames: Components.Schemas.PermissionsEnum[]
  to: string
  text: string
}

const IsAuthorizedButtonLink: React.FC<Props> = ({
  to, text, permissionNames, ...restProps
}) => {
  const [hasPermission] = useHasPermission(permissionNames);

  return hasPermission
    ? <ButtonLink to={to}><Button as="span" {...restProps}>{ text }</Button></ButtonLink>
    : <Button disabled {...restProps} title="U heeft geen permissie tot deze actie">{ text }</Button>;
};

export default IsAuthorizedButtonLink;

import { Icon } from '@amsterdam/asc-ui';
import LockOpen from '@material-ui/icons/LockOpen';

const LockIcon: React.FC = () => (
  <Icon size={28}>
    <LockOpen titleAccess="Openstaande taak" />
  </Icon>
);

export default LockIcon;

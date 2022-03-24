import { useUsersMe } from 'app/state/rest/index';

export default () => {
  const response = useUsersMe();
  return [response[0]?.permissions, response[1]] as const;
};

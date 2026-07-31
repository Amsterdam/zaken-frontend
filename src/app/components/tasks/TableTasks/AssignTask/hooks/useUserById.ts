import { useUsers } from "app/state/rest";

export const useUserById = (
  id?: string,
): [components["schemas"]["User"] | undefined, { isBusy: boolean }] => {
  const [data, { isBusy }] = useUsers();
  const user = data?.results?.find((user) => user.id === id);
  return [user, { isBusy }];
};

export default useUserById;

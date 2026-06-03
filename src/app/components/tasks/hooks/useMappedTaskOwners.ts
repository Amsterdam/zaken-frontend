import { useTaskOwners, useUsersMe } from "app/state/rest";
import { mapUserToOption } from "../utils/mapUserToOption";

export const useMappedTaskOwners = () => {
  const [taskOwners] = useTaskOwners();
  const [me] = useUsersMe();

  return taskOwners
    ?.map(mapUserToOption)
    .filter((option): option is NonNullable<typeof option> => option !== null)
    .sort((a, b) => {
      if (a.id === me?.id) return -1;
      if (b.id === me?.id) return 1;
      return 0;
    });
};

export default useMappedTaskOwners;

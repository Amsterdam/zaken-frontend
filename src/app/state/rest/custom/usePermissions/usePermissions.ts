import { useUsersMe } from "@/api/hooks";

export default () => {
  const { data, isLoading } = useUsersMe();
  return [data?.permissions, { isBusy: isLoading }] as const;
};
import usePermissions from "app/state/rest/custom/usePermissions/usePermissions"

export default (permissionName?: string) => {
  const [permissions, { isBusy }] = usePermissions()
  if (permissionName === undefined) return [true, false] as const
  const hasPermission = permissions?.includes(permissionName) ?? false
  return [hasPermission, isBusy] as const
}

import usePermissions from "app/state/rest/custom/usePermissions/usePermissions"

export default (permissionName?: Components.Schemas.PermissionsEnum) => {
  const [permissions, { isBusy }] = usePermissions()
  if (permissionName === undefined) return [true, false] as const
  const hasPermission = permissions?.includes(permissionName) ?? false
  return [hasPermission, isBusy] as const
}

export const SENSITIVE_CASE_PERMISSION = "access_sensitive_dossiers"

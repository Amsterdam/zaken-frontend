import usePermissions from "app/state/rest/custom/usePermissions/usePermissions"

export default (permissionsToCheck?: Components.Schemas.PermissionsEnum[]) => {
  const [permissions, { isBusy }] = usePermissions()
  if (permissionsToCheck === undefined) return [true, false] as const
  // permissionsToCheck and permissions must be arrays.
  if (!Array.isArray(permissionsToCheck) || !Array.isArray(permissions)) {
    return [false, false] as const
  }
  /*
   ** Merge permissins and check for duplicates.
   ** If one or more values are duplicated, user has permission
   */
  const mergedPermissions = [...permissions, ...permissionsToCheck]
  const hasPermission = new Set(mergedPermissions).size !== mergedPermissions.length

  return [hasPermission, isBusy] as const
}

export const SENSITIVE_CASE_PERMISSION = "access_sensitive_dossiers"

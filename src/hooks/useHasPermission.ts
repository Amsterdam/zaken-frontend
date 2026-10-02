import { useUsersMe } from "@/api/hooks"

export const SENSITIVE_CASE_PERMISSION = "access_sensitive_dossiers"
export const CAN_PERFORM_TASK = "perform_task"

/**
 * Whether the current user has at least one of the given permissions.
 * Returns [hasPermission, isLoading].
 */
const useHasPermission = (
  permissionsToCheck?: components["schemas"]["PermissionsEnum"][],
) => {
  const { data, isLoading } = useUsersMe()
  const permissions = data?.permissions

  // When no permission is needed
  if (permissionsToCheck === undefined) {
    return [true, false] as const
  }
  // Permissions are not loaded (yet)
  if (permissions === undefined || isLoading) {
    return [false, true] as const
  }
  // permissionsToCheck and permissions must be arrays.
  if (!Array.isArray(permissionsToCheck) || !Array.isArray(permissions)) {
    return [false, false] as const
  }
  /*
   ** Merge permissions and check for duplicates.
   ** If one or more values are duplicated, user has permission
   */
  const mergedPermissions = [...permissions, ...permissionsToCheck]
  const hasPermission =
    new Set(mergedPermissions).size !== mergedPermissions.length

  return [hasPermission, false] as const
}

export default useHasPermission

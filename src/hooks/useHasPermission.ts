import { useUsersMe } from "@/api/hooks"

export const SENSITIVE_CASE_PERMISSION = "access_sensitive_dossiers"
export const CAN_PERFORM_TASK = "perform_task"
export const EDIT_TASK_WEEK_NUMBER_PERMISSION = "edit_task_week_number"

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
  const hasPermission = permissionsToCheck.some((permission) =>
    permissions.includes(permission),
  )

  return [hasPermission, false] as const
}

export default useHasPermission

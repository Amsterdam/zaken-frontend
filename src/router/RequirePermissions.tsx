import { Outlet } from "react-router"
import { AmsterdamCrossSpinner } from "@/components/spinners/AmsterdamCrossSpinner/AmsterdamCrossSpinner"
import useHasPermission from "@/hooks/useHasPermission"
import NotAuthorizedPage from "app/pages/auth/NotAuthorizedPage"

type Props = {
  /** You need at least one of these. */
  requiredPermissions: components["schemas"]["PermissionsEnum"][]
}

/**
 * A layout route for the pages you need a permission for (after
 * top-frontend-v2): its child routes are only shown with the permission.
 * Without it the 403 page is shown, on the same URL.
 */
export default function RequirePermissions({ requiredPermissions }: Props) {
  const [hasPermission, isBusy] = useHasPermission(requiredPermissions)

  if (isBusy) {
    return <AmsterdamCrossSpinner />
  }

  if (!hasPermission) {
    return <NotAuthorizedPage />
  }

  return <Outlet />
}

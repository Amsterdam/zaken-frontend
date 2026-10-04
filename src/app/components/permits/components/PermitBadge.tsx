import { renderStatusBadge } from "@/shared/renderStatusBadge"
import { getPermitStatusBadgeVariant } from "../PowerBrowser/data/getPermitStatusBadgeVariant"

export function PermitBadge({ status }: { status: string }) {
  return renderStatusBadge(status, {
    variant: getPermitStatusBadgeVariant(status),
  })
}

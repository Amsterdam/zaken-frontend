import Tooltip from "@material-ui/core/Tooltip"
import { Spinner } from "@amsterdam/asc-ui"
import { useUsers } from "app/state/rest/index"
import { createNameAbbreviation } from "app/components/shared/Helpers/helpers"

type Props = {
  owner?: string
}

const UserInitials: React.FC<Props> = ({ owner }) => {
  const [data, { isBusy }] = useUsers()
  const users = data?.results
  const user = users && users.find((user) => user.id === owner)

  let userInitials = "-"
  let tooltipTitle = "Taak is nog niet opgepakt"
  if (owner) {
    userInitials = user ? createNameAbbreviation(user) : "Onbekend"
    tooltipTitle = user?.full_name || "Behandelaar is onbekend"
  }

  return (
    isBusy
      ? <Spinner />
      : (
          <Tooltip title={ tooltipTitle }>
            <span>
              { userInitials }
            </span>
          </Tooltip>
        )
  )
}

export default UserInitials

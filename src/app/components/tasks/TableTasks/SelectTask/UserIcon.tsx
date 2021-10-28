import styled from "styled-components"
import Tooltip from "@material-ui/core/Tooltip"
import LockOpen from "@material-ui/icons/PersonOutline"
import { Spinner, Icon, themeSpacing } from "@amsterdam/asc-ui"
import { useUsers } from "app/state/rest/index"
import { createNameAbbreviation } from "app/components/shared/Helpers/helpers"

type Props = {
  owner: string
}

const StyledSpinner = styled(Spinner)`
  margin: ${ themeSpacing(2) };
`

const StyledIcon = styled(Icon)`
  display: flex;
  align-items: center;
  margin: ${ themeSpacing(1) };
`

const StyledDiv = styled.div`
  margin-left: ${ themeSpacing(2) };
`

const UserIcon: React.FC<Props> = ({ owner }) => {
  const [data, { isBusy }] = useUsers()
  const users = data?.results
  const user = users && users.find((user) => user.id === owner)

  return (
    isBusy
      ? <StyledSpinner />
      : (
          <Tooltip title={user?.full_name || "Behandelaar is onbekend"}>
            <StyledIcon size={ 28 }>
              <LockOpen />
              <StyledDiv>{user ? createNameAbbreviation(user) : "Onbekend"}</StyledDiv>
            </StyledIcon>
          </Tooltip>
        )
  )
}

export default UserIcon

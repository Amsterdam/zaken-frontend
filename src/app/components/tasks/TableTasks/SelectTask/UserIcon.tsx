import styled from "styled-components"
import { Spinner, themeSpacing } from "@amsterdam/asc-ui"
import { useUsers } from "app/state/rest/index"
import { createNameAbbreviation } from "app/components/shared/Helpers/helpers"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon"

type Props = {
  owner: string
}

const StyledSpinner = styled(Spinner)`
  margin: ${ themeSpacing(2) };
`

const Wrapper = styled.div`
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
        <CustomTooltip title={user?.full_name || "Behandelaar is onbekend"}>
          <Wrapper>
            <CustomIcon name="PermIdentity" size={28} />
            <StyledDiv>{user ? createNameAbbreviation(user) : "Onbekend"}</StyledDiv>
          </Wrapper>
        </CustomTooltip>
      )
  )
}

export default UserIcon

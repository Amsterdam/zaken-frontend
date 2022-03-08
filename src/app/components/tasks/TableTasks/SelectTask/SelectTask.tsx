import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { Spinner, Checkbox, themeSpacing, Label } from "@amsterdam/asc-ui"
import { useUsersMe } from "app/state/rest/index"
import { useTask } from "app/state/rest"
import UserIcon from "./UserIcon"
import useContextCache from "app/state/rest/provider/useContextCache"
import { createNameAbbreviation } from "app/components/shared/Helpers/helpers"
import CustomTooltip from "app/components/help/HelpContent/CustomTooltip"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"
import { ContextValues } from "app/state/context/ValueProvider"
import { getQueryUrl } from "app/state/rest/tasks"

type Props = {
  id: number
  owner?: string | null
}

const StyledSpinner = styled(Spinner)`
  margin: ${ themeSpacing(2) };
`

const StyledLabel = styled(Label)`
  font-weight: 400;
`

const SelectTask: React.FC<Props> = ({ id, owner }) => {
  // Get tasks params to create the query params url for the Context.
  // Two different providers are being used. :(
  const { pagination, sorting, role, theme } = useContext(ContextValues)["tasks"]
  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, { isBusy }] = useUsersMe()
  const [, { execPatch }] = useTask(id)
  // Filtered tasks are stored with the search query as a parameter in the context.
  const queryUrl = getQueryUrl(hasPermission, pagination, sorting, theme, role)
  const { getContextItem, updateContextItem } = useContextCache("cases", queryUrl)

  useEffect(() => {
    // Check if userId is matching with the owner.
    const isSelected = data?.id === owner
    setIsChecked(isSelected)
  }, [data?.id, owner])

  const onChange = () => {
    setLoading((prevLoading) => !prevLoading)
    const newOwner = isChecked ? null : data?.id
    execPatch({ owner: newOwner })
      .then((resp: any) => {
        if (resp.status === 200) {
          // Owner changed so update context.
          const tasksRespponse = getContextItem()
          const tasks = tasksRespponse?.results
          let newTasks = [...tasks]
          const index = tasks.findIndex((task: { id: number }) => task.id === id)
          const obj = newTasks[index]
          newTasks[index] = { ...obj, owner: newOwner }
          const newContextItem = { ...tasksRespponse, results: newTasks }
          updateContextItem(newContextItem)
        }
        setLoading((prevLoading) => !prevLoading)
      })
  }

  if (isBusy || loading) {
    return <StyledSpinner />
  }
  // If owner is known but the the owner is not the active user, show a user icon.
  if (owner && owner !==  data?.id ) {
    return <UserIcon owner={ owner }/>
  }
  return (

    <StyledLabel htmlFor={`cb_${ id }`} label={data && data?.id === owner ? `${ createNameAbbreviation(data) }` : ""}>
      <CustomTooltip title={isChecked ? "Mijn taak" : "Beschikbaar"}>
        <Checkbox data-e2e-id={`${ id }`} id={ `cb_${ id }` } checked={isChecked} onChange={ onChange }/>
      </CustomTooltip>
    </StyledLabel>

  )
}

export default SelectTask

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
  taskId: any
  taskOwner?: string | null
  isEnforcement: boolean
}

const StyledSpinner = styled(Spinner)`
  margin: ${ themeSpacing(2) };
`

const StyledLabel = styled(Label)`
  font-weight: 400;
`

const enforcementPagination = {
  page: 1, // There is no pagination for enforcement tasks
  pageSize: 1000 // 1000 is the maximum
}

const SelectTask: React.FC<Props> = ({ taskId, taskOwner, isEnforcement }) => {
  // Get tasks params to create the query params url for the Context.
  // Two different providers are being used. :(
  const { pagination, sorting, role, theme, owner, taskName } = useContext(ContextValues)["tasks"]
  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, { isBusy }] = useUsersMe()
  const [, { execPatch }] = useTask(taskId)
  // Filtered tasks are stored with the search query as a parameter in the context.
  const queryUrl = getQueryUrl(
    hasPermission,
    isEnforcement ? enforcementPagination : pagination,
    sorting,
    theme,
    role,
    owner,
    isEnforcement,
    taskName
  )
  const { getContextItem, updateContextItem } = useContextCache("cases", queryUrl)

  useEffect(() => {
    // Check if userId is matching with the taskOwner.
    const isSelected = data?.id === taskOwner
    setIsChecked(isSelected)
  }, [data?.id, taskOwner])

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
          const index = tasks.findIndex((task: { id: number }) => task.id === taskId)
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
  // If taskOwner is known but the the taskOwner is not the active user, show a user icon.
  if (taskOwner && taskOwner !==  data?.id ) {
    return <UserIcon owner={ taskOwner }/>
  }
  return (
    <StyledLabel htmlFor={`cb_${ taskId }`} label={data && data?.id === taskOwner ? `${ createNameAbbreviation(data) }` : ""}>
      <CustomTooltip title={isChecked ? "Mijn taak" : "Beschikbaar"}>
        <Checkbox data-e2e-id={`${ taskId }`} id={ `cb_${ taskId }` } checked={isChecked} onChange={ onChange }/>
      </CustomTooltip>
    </StyledLabel>
  )
}

export default SelectTask

import { useState, useEffect } from "react"
import styled from "styled-components"
import { Spinner, Checkbox, themeSpacing, Label } from "@amsterdam/asc-ui"
import Tooltip from "@material-ui/core/Tooltip"
import { useUsersMe } from "app/state/rest/index"
import { useTask } from "app/state/rest"
import UserIcon from "./UserIcon"
import useContextCache from "app/state/rest/provider/useContextCache"
import { createNameAbbreviation } from "app/components/shared/Helpers/helpers"
import getApiUrlTasks from "../../utils/getApiUrlTasks"

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
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, { isBusy }] = useUsersMe()
  const [, { execPatch }] = useTask(id)
  // Filtered tasks are stored with the search query as a parameter in the context.
  const apiUrl = getApiUrlTasks()
  const { getContextItem, updateContextItem } = useContextCache("cases", apiUrl)

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
          const tasks = getContextItem()
          let newTasks = [...tasks]
          const index = tasks.findIndex((task: { id: number }) => task.id === id)
          const obj = newTasks[index]
          newTasks[index] = { ...obj, owner: newOwner }
          updateContextItem(newTasks)
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
      <Tooltip title={isChecked ? "Mijn taak" : "Beschikbaar"}>
        <Checkbox data-e2e-id={`${ id }`} id={ `cb_${ id }` } checked={isChecked} onChange={ onChange }/>
      </Tooltip>
    </StyledLabel>

  )
}

export default SelectTask

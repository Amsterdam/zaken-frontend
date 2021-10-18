import { useState, useEffect } from "react"
import styled from "styled-components"
import { Spinner, Checkbox, themeSpacing } from "@amsterdam/asc-ui"
import { useUsersMe } from "app/state/rest/index"
import { useTask } from "app/state/rest"
import UserIcon from "./UserIcon"

type Props = {
  id: number
  owner?: string | null
}

const StyledSpinner = styled(Spinner)`
  margin: ${ themeSpacing(2) };
`

const SelectTask: React.FC<Props> = ({ id, owner }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, { isBusy }] = useUsersMe()
  const [, { execPatch }] = useTask(id)

  useEffect(() => {
    const isSelected = data?.id === owner
    setIsChecked(isSelected)
  }, [data?.id, owner])

  const onChange = () => {
    setLoading((prevLoading) => !prevLoading)
    execPatch({ owner: isChecked ? null : data?.id })
      .then((resp: any) => {
        if (resp.status === 200) {
          setIsChecked((prevIsChecked) => !prevIsChecked)
        }
        setLoading((prevLoading) => !prevLoading)
      })
  }

  if (isBusy || loading) {
    return <StyledSpinner />
  }
  // If owner is known but not the active user.
  if (owner && owner !==  data?.id ) {
    return <UserIcon owner={ owner }/>
  }
  return <Checkbox id={`${ id }`} checked={isChecked} onChange={ onChange }/>
}

export default SelectTask

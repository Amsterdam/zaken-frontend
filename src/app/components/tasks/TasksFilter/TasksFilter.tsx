import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffold from "./scaffold"

type Props = {
  roles?: string[]
  setRole: (value: string) => void
}

const TasksFilter: React.FC<Props> = ({ roles, setRole }) => {
  const onChange = (value: string) => setRole(value)
  return (
    <>
      <FilterMenu>
        { roles === undefined ?
          <Spinner /> :
          <ScaffoldForm>
            <ScaffoldFields { ...scaffold(roles, onChange) } />
          </ScaffoldForm>
        }
      </FilterMenu>
      <FilterMenu>
        <i><a href={ window.location.pathname }>Herlaad taken</a></i>
      </FilterMenu>
    </>
  )
}
export default TasksFilter

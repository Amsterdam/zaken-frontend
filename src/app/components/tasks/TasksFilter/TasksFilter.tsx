import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Spinner } from "@amsterdam/asc-ui"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffold from "./scaffold"

type Props = {
  role: MockComponents.Schemas.Role
  roles?: MockComponents.Schemas.Role[]
  setRole: (value: string) => void
}

const TasksFilter: React.FC<Props> = ({ role, roles, setRole }) => {
  const onChange = (value: string) => setRole(value)
  return (
    <>
      <FilterMenu>
        { roles === undefined ?
          <Spinner /> :
          <ScaffoldForm>
            <ScaffoldFields { ...scaffold(role, roles, onChange) } />
          </ScaffoldForm>
        }
      </FilterMenu>
      <FilterMenu>
        <i><a href={ `${ window.location.pathname }${ window.location.search }` }>Herlaad taken</a></i>
      </FilterMenu>
    </>
  )
}
export default TasksFilter

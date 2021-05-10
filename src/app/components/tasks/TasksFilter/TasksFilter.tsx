import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffold from "./scaffold"

type Props = {
  role: string
  setRole: (value: string) => void
}

const TasksFilter: React.FC<Props> = ({ role, setRole }) => {
  const onChange = (value: string) => setRole(value)
  return (
    <FilterMenu>
      <ScaffoldForm>
        <ScaffoldFields { ...scaffold(role, onChange) } />
      </ScaffoldForm>
    </FilterMenu>
  )
}
export default TasksFilter

import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"

import FilterMenu from "app/components/shared/FilterMenu/FilterMenu"
import ScaffoldFields from "app/components/shared/Form/ScaffoldFields"
import scaffold from "./scaffold"

type Props = {
  date: string
  setDate: (value: string) => void
}

const CasesFilter: React.FC<Props> = ({ date, setDate }) => (
  <FilterMenu>
    <ScaffoldForm>
      <ScaffoldFields { ...scaffold(date, setDate) } />
    </ScaffoldForm>
  </FilterMenu>
)
export default CasesFilter

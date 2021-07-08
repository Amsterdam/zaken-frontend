import useValues from "./hooks/useValues"
import PersonDisplay from "app/components/shared/PersonDisplay/PersonDisplay"
import { DefinitionList } from "@amsterdam/wonen-ui"

type Props = {
  resident: Components.Schemas.Resident
  num: number
}

const Resident: React.FC<Props> = ({ resident, num }) => {
  const title = <>
    { `${ num }. ` }
    <PersonDisplay
      sex={ resident.geslachtsaanduiding }
      firstName={ `${ resident.voorletters }.` }
      namePrefix={ resident.voorvoegsel_geslachtsnaam }
      name={ resident.geslachtsnaam }
    />
  </>
  const values = useValues(resident)

  return (
    <DefinitionList
      title={ title }
      headingSize="h3"
      values={ values }
    />
  )
}
export default Resident

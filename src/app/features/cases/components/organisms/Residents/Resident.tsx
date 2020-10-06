import React, { useMemo } from "react"
import Details from "app/features/shared/components/molecules/Details/Details"
import PersonDisplay from "app/features/shared/components/atoms/PersonDisplay/PersonDisplay"
import DateDisplay from "app/features/shared/components/atoms/DateDisplay/DateDisplay"

type Props = {
  resident: Components.Schemas.Resident
  num: number
}

const Resident: React.FC<Props> = ({ resident, num }) => {
  const title = <>{ `${ num }. ` } <PersonDisplay sex={ resident.geslachtsaanduiding } firstName={ `${ resident.voorletters }.` } namePrefix={ resident.voorvoegsel_geslachtsnaam } name={ resident.geslachtsnaam } /></>
  const values = useMemo(() => ({
    "Geboren": <DateDisplay date={ resident.geboortedatum } />,
    "Ingeschreven sinds": <DateDisplay date={ resident.datum_begin_relatie_verblijadres } />
  }), [resident.geboortedatum, resident.datum_begin_relatie_verblijadres])

  return <Details
    numInitialVisibleRows={4}
    title={ title }
    headingSize="h6"
    values={ values }
    startAlternative={ false }
  />
}
export default Resident

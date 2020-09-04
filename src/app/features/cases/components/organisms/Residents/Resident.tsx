import React, { useMemo } from "react"
import Details from "app/features/shared/components/molecules/Details/Details"
import DateDisplay from "app/features/shared/components/atoms/DateDisplay/DateDisplay"

type Props = {
  resident: Components.Schemas.Resident
  num: number
}

const mapSex = (value: Components.Schemas.Resident["geslachtsaanduiding"]) => {
  if (value === "M") return "Dhr. "
  if (value === "V") return "Mvr. "
  if (value === "X") return ""
}

const Resident: React.FC<Props> = ({ resident, num }) => {
  const values = useMemo(() => ({
    [`${ num }. ${ mapSex(resident.geslachtsaanduiding) }${ resident.voorletters }. ${ resident.voorvoegsel_geslachtsnaam } ${ resident.geslachtsnaam }`]: "",
    "Geboren": <DateDisplay date={ resident.geboortedatum } />,
    "Ingeschreven sinds": <DateDisplay date={ resident.datum_begin_relatie_verblijadres } />
  }), [num, resident.datum_begin_relatie_verblijadres, resident.geboortedatum, resident.geslachtsaanduiding, resident.geslachtsnaam, resident.voorletters, resident.voorvoegsel_geslachtsnaam])
  return <Details
    numInitialVisibleRows={4}
    values={ values }
    startAlternative={ false }
  />
}
export default Resident

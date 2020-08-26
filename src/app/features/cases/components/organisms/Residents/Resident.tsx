import React, { useMemo } from "react"
import Details from "app/features/shared/components/molecules/Details/Details"

type Props = {
  resident: API.Resident
  num: number
}

const mapSex = (value: API.Resident["geslachtsaanduiding"]) => {
  if (value === "M") return "Dhr. "
  if (value === "V") return "Mvr. "
  if (value === "X") return ""
}

const Resident: React.FC<Props> = ({ resident, num }) => {
  const values = useMemo(() => ({
    [`${ num }. ${ mapSex(resident.geslachtsaanduiding) }${ resident.voorletters }. ${ resident.voorvoegsel_geslachtsnaam } ${ resident.geslachtsnaam }`]: "",
    "Geboren": resident.geboortedatum.substr(0, 10),
    "Ingeschreven sinds": resident.datum_begin_relatie_verblijadres.substr(0, 10),
    "Uitgeschreven sinds": undefined
  }), [num, resident.datum_begin_relatie_verblijadres, resident.geboortedatum, resident.geslachtsaanduiding, resident.geslachtsnaam, resident.voorletters, resident.voorvoegsel_geslachtsnaam])
  return <Details
    numInitialVisibleRows={4}
    values={ values }
    startAlternative={ false }
  />
}
export default Resident

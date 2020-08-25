import React, { useMemo } from "react"
import Details from "app/features/shared/components/molecules/Details/Details"

type Props = {
  resident: API.Resident
}

const mapSex = (value: API.Resident["geslachtsaanduiding"]) => {
  if (value === "M") return "Dhr. "
  if (value === "V") return "Mvr. "
  if (value === "X") return ""
}

const Resident: React.FC<Props> = ({ resident }) => {
  const values = useMemo(() => ({
    "Naam": `${ mapSex(resident.geslachtsaanduiding) }${ resident.voorletters }. ${ resident.voorvoegsel_geslachtsnaam } ${ resident.geslachtsnaam }`,
    "Geboren": resident.geboortedatum.substr(0, 10),
    "Ingeschreven sinds": resident.datum_begin_relatie_verblijadres.substr(0, 10),
    "Uitgeschreven sinds": "__TODO__"
  }), [resident])
  return <Details
    numInitialVisibleRows={3}
    values={ values }
  />
}
export default Resident

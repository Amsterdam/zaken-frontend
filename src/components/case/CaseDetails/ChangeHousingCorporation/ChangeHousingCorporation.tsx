import { useState } from "react"
import { useCorporations } from "@/api/hooks"
import ChangeableItem from "../ChangeableItem/ChangeableItem"
import ChangeHousingCorporationDialog from "./ChangeHousingCorporationDialog"

type Props = {
  housingCorporationId?:
    components["schemas"]["HousingCorporation"]["id"] | null
  bagId: components["schemas"]["Address"]["bag_id"]
  caseId: components["schemas"]["Case"]["id"]
}

const ChangeHousingCorporation: React.FC<Props> = ({
  housingCorporationId,
  bagId,
  caseId,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data } = useCorporations()
  const housingCorporations = data?.results ?? []
  const current = housingCorporations.find(
    (corporation) => corporation.id === housingCorporationId,
  )

  return (
    <>
      <ChangeableItem
        // Still loading the names: no name yet for the corporation of the address.
        name={
          housingCorporationId == null
            ? "Geen corporatie"
            : (current?.name ?? "-")
        }
        titleAccess="Wijzig de woningcorporatie"
        onClick={() => setIsDialogOpen(true)}
      />
      {isDialogOpen && (
        <ChangeHousingCorporationDialog
          housingCorporations={housingCorporations}
          housingCorporationId={housingCorporationId}
          bagId={bagId}
          caseId={caseId}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  )
}

export default ChangeHousingCorporation

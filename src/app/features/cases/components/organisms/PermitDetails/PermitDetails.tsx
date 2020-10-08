import React, { useMemo } from "react"

import { usePermitCheckmarks } from "app/state/rest"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}


const PermitDetails: React.FC<Props> = ({ bagId }) => {
  const { data, isBusy } = usePermitCheckmarks(bagId)

  const values = useMemo(() => ({
    "Bed & Breakfast": data?.has_b_and_b_permit ? "Ja" : "Nee",
    "Vakantieverhuur": data?.has_vacation_rental_permit ? "Ja" : "Nee"
  }), [data])

  return (
      <DefinitionList isLoading={isBusy} numLoadingRows={2} values={values} title="Vergunningen" />
  )
}
export default PermitDetails

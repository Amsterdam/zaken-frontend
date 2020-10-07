import React, { useMemo } from "react"
import { Heading } from "@datapunt/asc-ui"

import { usePermitCheckmarks } from "app/state/rest"
import Details from "app/features/shared/components/molecules/Details/Details"

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
    <>
      <Heading>Vergunningen</Heading>
      <Details isLoading={isBusy} numLoadingRows={2} values={values} />
    </>
  )
}
export default PermitDetails

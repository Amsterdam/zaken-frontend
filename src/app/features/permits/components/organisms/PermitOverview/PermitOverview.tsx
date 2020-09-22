import React, { useMemo } from "react"

import { usePermitCheckmarks } from "app/state/rest"

import Heading from "app/features/shared/components/atoms/Heading/Heading"
import Details from "app/features/shared/components/molecules/Details/Details"

type Props = {
  bagId: string
}

const PermitOverview: React.FC<Props> = ({ bagId }) => {
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
export default PermitOverview

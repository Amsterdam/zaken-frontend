import React, { useMemo } from "react"

import usePermit from "app/state/rest/hooks/custom/usePermits"

import Heading from "app/features/shared/components/atoms/Heading/Heading"
import Details from "app/features/shared/components/molecules/Details/Details"

type Props = {
  id: NonNullable<API.Case["identification"]>
}

const PermitDetails: React.FC<Props> = ({ id }) => {
  const { data, isBusy } = usePermit(id)

  const values = useMemo(() => ({
    "Bed & Breakfast": data?.bedBreakfast ? "Ja" : "Nee",
    "Vakantieverhuur": data?.holidayRental ? "Ja" : "Nee"
  }), [data])

  return (
    <>
      <Heading>Vergunningen</Heading>
      <Details isLoading={isBusy} numLoadingRows={2} values={values} />
    </>
  )
}
export default PermitDetails

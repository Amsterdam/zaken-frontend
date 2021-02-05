import React, { useMemo } from "react"
import { Link } from "@amsterdam/asc-ui"
import { usePermitCheckmarks } from "app/state/rest"

import to from "app/routing/utils/to"
import DefinitionList from "app/components/shared/components/molecules/DefinitionList/DefinitionList"

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
      <DefinitionList isLoading={isBusy} numLoadingRows={2} values={values} title="Vergunningen" />
      <Link href={ to("/adres/:bagId/vergunningen", { bagId }) } variant="inline" inList>Alle vergunningen details</Link>
    </>
  )
}
export default PermitOverview

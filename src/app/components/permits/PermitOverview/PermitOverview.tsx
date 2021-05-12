import { useMemo } from "react"
import { Link } from "@amsterdam/asc-ui"
import { usePermitDetails } from "app/state/rest"

import to from "app/routing/utils/to"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"

type Props = {
  bagId: string
}

const PermitOverview: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitDetails(bagId)

  const values = useMemo(() => (data ? data.permits.filter(p => ["True", "False"].includes(p.permit_granted)).reduce((t: any, c) => {
    t[c.permit_type] = (c.permit_granted === "True" ? "ja" : "nee")
      return t
    }, {})
  : []), [data])

  return (
    <>
      <DefinitionList isLoading={isBusy} numLoadingRows={2} values={values} title="Vergunningen" />
      <Link href={ to("/adres/:bagId/vergunningen", { bagId }) } variant="inline" inList>Alle vergunningen details</Link>
    </>
  )
}
export default PermitOverview

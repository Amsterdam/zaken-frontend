
import { ResidentsV2 } from "@amsterdam/wonen-ui"
import { useResidentsNew } from "app/state/rest"
import LoadingDetails from "app/components/shared/Details/LoadingDetails"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const ResidentsOverviewNew: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useResidentsNew(bagId)
  const dataSource = (data || []) as Components.Schemas.Brp

  if (isBusy) {
    return <LoadingDetails numRows={4} />
  }
  return (
    <ResidentsV2 data={dataSource} header />
  )
}

export default ResidentsOverviewNew

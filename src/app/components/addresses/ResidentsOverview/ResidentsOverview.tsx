
import { Heading } from "@amsterdam/asc-ui"
import { Residents } from "@amsterdam/wonen-ui"

import { useResidents } from "app/state/rest"
import LoadingDetails from "app/components/shared/Details/LoadingDetails"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const ResidentsOverview: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useResidents(bagId)

  if (isBusy) {
    return <LoadingDetails numRows={4} />
  }
  return (
    <>
      <Heading as="h2">Actueel ingeschreven personen ({ data?._embedded?.ingeschrevenpersonen.length })</Heading>
      <Residents data={ data } loading={ isBusy } />
    </>
  )
}
export default ResidentsOverview

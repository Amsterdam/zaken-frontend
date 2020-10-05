import React from "react"
import Residents from "app/features/cases/components/organisms/Residents/Residents"
import { tmpCaseId } from "app/state/rest/custom/useResidentsByBagId/useResidentsByBagId"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

// TODO: Do show Residents by BAG_id
const People: React.FC<Props> = () => <Residents id={ tmpCaseId } />
export default People

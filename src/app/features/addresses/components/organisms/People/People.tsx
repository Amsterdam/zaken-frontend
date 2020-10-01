import React from "react"
import Residents from "app/features/cases/components/organisms/Residents/Residents"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

// TODO: Do show Residents by BAG_id
const People: React.FC<Props> = () => <Residents id="297951_7" />
export default People

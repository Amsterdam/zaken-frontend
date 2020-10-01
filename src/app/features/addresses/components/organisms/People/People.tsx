import React from "react"
import Residents from "app/features/cases/components/organisms/Residents/Residents"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
}

const People: React.FC<Props> = ({ bagId }) => <Residents id="297951_7" />
export default People

import React from "react"
import Heading from "app/features/shared/components/atoms/Heading/Heading"
import { useCaseResidents } from "app/state/rest"
import Resident from "./Resident"

type Props = {
  id: NonNullable<API.Case["identification"]>
}

const Residents: React.FC<Props> = ({ id }) => {
  const { data: caseResidents } = useCaseResidents(id)
  return (
    <>
      <Heading>Actueel ingeschreven personen</Heading>
      { caseResidents?.items
          .map((resident, index) => <Resident key={ index } resident={ resident } />)
      }
    </>
  )
}
export default Residents

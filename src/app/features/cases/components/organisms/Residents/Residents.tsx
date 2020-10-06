import React from "react"
import Heading from "app/features/shared/components/atoms/Heading/Heading"

import { useCaseResidents } from "app/state/rest"

import Resident from "./Resident"
import LoadingDetails from "app/features/shared/components/molecules/Details/LoadingDetails"

type Props = {
  id: NonNullable<Components.Schemas.Case["identification"]>
}

const Residents: React.FC<Props> = ({ id }) => {
  const { data: caseResidents } = useCaseResidents(id)

  return (
    <>
      { caseResidents ?
        <>
          <Heading>Actueel ingeschreven personen ({ caseResidents.items.length })</Heading>
          { caseResidents.items
              .map((resident, index) => <Resident key={ index } resident={ resident } num={ index + 1 }/>)
          }
        </>
        :
        <LoadingDetails numRows={4} />
      }
    </>
  )
}
export default Residents

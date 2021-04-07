import React from "react"
import { Heading, Spinner } from "@amsterdam/asc-ui"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"
import MapArrayToList from "app/components/shared/Helpers/MapArrayToList"
import { useSummonsWithCaseId } from "app/state/rest/case"
import { capitalizeString } from "app/components/shared/Helpers/helpers"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const DecisionHeader: React.FC<Props> = ({ caseId }) => {

  const [data] = useSummonsWithCaseId(caseId)
  const summon = data?.results?.[0]

  const summonedPersons = summon?.persons
  const summonTypeName = summon?.type_name

  const mapPersons = summonedPersons?.map((person) =>
    `${ capitalizeString(person.first_name) } ${ person.preposition ? person.preposition : "" } ${ capitalizeString(person.last_name) }`
  )

  const values = {
    "Aanschrijving": summonTypeName,
    "Aangeschrevene(n)": mapPersons !== undefined ? MapArrayToList(mapPersons) : "-"
  }

  return (
    <>
      <Heading as="h4">Besluit naar aanleiding van:</Heading>
      { data === undefined ?
        <Spinner /> :
        <DefinitionList
          numLoadingRows={2}
          values={values} />
      }
    </>
  )
}
export default DecisionHeader

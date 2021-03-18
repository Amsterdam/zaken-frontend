import React from "react"
import { Heading, Spinner } from "@amsterdam/asc-ui"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"
import { mapArrayToList } from "app/components/shared/Helpers/helpers"
import { useSummonsWithCaseId } from "app/state/rest/case"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const DecisionHeader: React.FC<Props> = ({ caseId }) => {

  const [data] = useSummonsWithCaseId(caseId)
  const summon = data?.results?.[0]

  const summonedPersons = summon?.persons
  const summonTypeName = summon?.type_name

  const mapPersons = summonedPersons?.map((person) => 
    `${ person.first_name } ${ person.preposition ? person.preposition : "" } ${ person.last_name }`
  )

  const values = {
    "Aanschrijving": summonTypeName,
    "Aangeschrevene(n)": mapArrayToList( mapPersons || ["Onbekend"] )
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

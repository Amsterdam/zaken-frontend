import React, { useEffect, useMemo } from "react"
import { Heading } from "@amsterdam/asc-ui"
import { useCase } from "app/state/rest/"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"
import { mapArrayToList } from "app/components/shared/Helpers/helpers"
import { useSummonTypes } from "app/state/rest/case"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const DecisionHeader: React.FC<Props> = ({ caseId }) => {
  const [data] = useCase(caseId)

  // TODO-MOCKED, get summonId/summonTitle from useCaseEvents(caseId)
  const summonId = 6
  const [summonType, { execGet }] = useSummonTypes(summonId, { lazy: true })

  useEffect(() => {
      if (summonId === undefined) return
      execGet()
    },
    [summonId, execGet]
  )

  const values = useMemo(() => ({
    "Aanschrijving": summonType?.title,
    "Aangeschrevene(n)": mapArrayToList(["Donald Duck", "katrien duck"])
  }), [summonType])

  return (
    <>
      <Heading as="h4">Besluit naar aanleiding van:</Heading>
      { data &&
        <DefinitionList
          isLoading={data === undefined }
          numLoadingRows={2}
          values={values} />
      }
    </>
  )
}
export default DecisionHeader

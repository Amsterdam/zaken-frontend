import React, { useMemo } from "react"
import { Heading } from "@amsterdam/asc-ui"
import { useCase } from "app/state/rest/"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"
import { mapArrayToList } from "app/components/shared/Helpers/helpers"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const DecisionHeader: React.FC<Props> = ({ caseId }) => {
  const [data] = useCase(caseId)
  const values = useMemo(() => ({
    "Aanschrijving": "Voornemen boete",
    "Aangeschrevene(n)": mapArrayToList(["Donald Duck", "katrien duck"])
  }), [data])

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

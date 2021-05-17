import { Spinner, Heading, Paragraph, Link } from "@amsterdam/asc-ui"

import to from "app/routing/utils/to"
import { usePermitDetails } from "app/state/rest"
import usePermitValues from "./hooks/usePermitValues"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"

type Props = {
  bagId: string
}

const PermitOverview: React.FC<Props> = ({ bagId }) => {

  const [data, { isBusy }] = usePermitDetails(bagId)
  const values = usePermitValues(data)

  return (
    <>
      { isBusy ?
        <Spinner /> :
        <>
          { values === undefined ?
            <>
              <Heading forwardedAs="h2">Vergunningen</Heading>
              <Paragraph>Geen vergunningen gevonden</Paragraph>
            </> :
            <DefinitionList isLoading={ isBusy } numLoadingRows={ 2 } values={ values } title="Vergunningen" />
          }
          <Link href={ to("/adres/:bagId/vergunningen", { bagId }) } variant="inline" inList>Alle vergunningen details</Link>
        </>
      }
    </>
  )
}
export default PermitOverview

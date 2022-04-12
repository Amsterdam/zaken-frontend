
import { PermitsOverview } from "@amsterdam/wonen-ui"
import { Heading } from "@amsterdam/asc-ui"
import { usePermitDetails } from "app/state/rest"

type Props = {
  bagId: string
}

const PermitDetails: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitDetails(bagId)

  return (
    <>
      <Heading forwardedAs="h4">Vergunningen</Heading>
      <PermitsOverview
        permits={ data?.permits || [] }
        loading={ isBusy }
      />
    </>
  )
}

export default PermitDetails

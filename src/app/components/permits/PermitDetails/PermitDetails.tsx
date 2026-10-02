import { PermitsOverview } from "@amsterdam/wonen-ui"
import { Heading } from "@amsterdam/asc-ui"
import { usePermitDetails } from "@/api/hooks"

type Props = {
  bagId: string
}

const PermitDetails: React.FC<Props> = ({ bagId }) => {
  const { data, isLoading: isBusy } = usePermitDetails(bagId)

  return (
    <>
      <Heading forwardedAs="h4">Vergunningen</Heading>
      <PermitsOverview permits={data?.permits || []} loading={isBusy} />
    </>
  )
}

export default PermitDetails

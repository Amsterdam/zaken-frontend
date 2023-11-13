
import { PermitsSynopsis } from "@amsterdam/wonen-ui"
import { Heading } from "@amsterdam/asc-ui"
import { usePermitsPowerBrowser } from "app/state/rest"

type Props = {
  bagId: string
}

const PermitsPowerBrowser: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitsPowerBrowser(bagId)

  return (
    <>
      <Heading forwardedAs="h4">Vergunningen PowerBrowser</Heading>
      <PermitsSynopsis
        permits={ data || [] }
        loading={ isBusy }
      />
    </>
  )
}

export default PermitsPowerBrowser

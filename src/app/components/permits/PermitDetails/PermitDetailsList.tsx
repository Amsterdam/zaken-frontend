
import { Spinner, Heading, Paragraph } from "@amsterdam/asc-ui"

import { usePermitDetails } from "app/state/rest"
import useKnownPermits from "./hooks/useKnownPermits"
import PermitDetails from "./PermitDetails"

type Props = {
  bagId: string
}

const PermitDetailsList: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitDetails(bagId)
  const permits = useKnownPermits(data)

  if (isBusy) {
	  return <Spinner />
  }
  return (
		<>
			{ permits === undefined ? (
					<>
						<Heading forwardedAs="h4">Vergunningen</Heading>
						<Paragraph>Geen vergunningen gevonden</Paragraph>
					</>
				) : (
					<div>
						{ permits.map(permit => (
								<PermitDetails key={ permit.permit_type } permit={ permit } />
							)
						)}
					</div>
				)
			}
		</>
  )
}

export default PermitDetailsList

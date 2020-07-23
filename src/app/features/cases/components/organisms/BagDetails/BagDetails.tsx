import React from "react"
import { useBAG } from "app/state/rest"
import Details from "app/features/shared/components/molecules/Details/Details"

type Props = {
  bagID: string
}

const BAGDetails: React.FC<Props> = ({ bagID }) => {
  const { data, isBusy } = useBAG(bagID)
  const { _links, centroid, ...strippedData } = data?.results[0] ?? {}

  // @ts-ignore
  return <Details isLoading={isBusy} title="Basis administratie gebouwen" values={strippedData} />
}

export default BAGDetails

import React from "react"
import { useBAG } from "app/state/rest"
import Details from "app/features/shared/components/molecules/Details/Details"

type Props = {
  bagID: string
}

const BAGDetails: React.FC<Props> = ({ bagID }) => {
  const { data } = useBAG(bagID)
  const { _links, centroid, ...strippedData } = data?.results[0] ?? {}

  // @ts-ignore
  return <Details title="BAG" values={strippedData} />
}

export default BAGDetails

import React from "react"
import { RouteComponentProps } from "@reach/router"

import { useCase } from "app/state/rest"

import TwoColumnLayout from "app/features/shared/components/layouts/TwoColumnLayout/TwoColumnLayout"

import BagMap from "app/features/cases/components/organisms/BagMap/BagMap"
import CaseDetails from "app/features/cases/components/organisms/CaseDetails/CaseDetails"

type Props = {
  id: API.Case["identification"]
}

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data } = useCase(id)

  return (
    <TwoColumnLayout
      left={data?.address.bag_id !== undefined ? <BagMap bagId={data.address.bag_id} /> : undefined}
      right={data && <CaseDetails caseData={data} />}
    />
  )
}

export default DetailsPage

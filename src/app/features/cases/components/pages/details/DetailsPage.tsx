import React from "react"
import { RouteComponentProps } from "@reach/router"

import { useCase, useCaseFines } from "app/state/rest"

import Details from "app/features/shared/components/molecules/Details/Details"
import TwoColumnLayout from "app/features/shared/components/layouts/TwoColumnLayout/TwoColumnLayout"

import BagMap from "app/features/cases/components/organisms/BagMap/BagMap"
import CaseDetails from "app/features/cases/components/organisms/CaseDetails/CaseDetails"
import BAGDetails from "app/features/cases/components/organisms/BagDetails/BagDetails"

type Props = {
  id: API.Case["identification"]
}

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data: caseData } = useCase(id)
  const { data: finesData } = useCaseFines(id)

  const map = caseData?.address.bag_id !== undefined
    ? <BagMap bagId={caseData.address.bag_id} />
    : undefined

  return (
    <TwoColumnLayout
      left={map}
      right={
        <>
          { caseData && <>
              <CaseDetails caseData={caseData} />
              <BAGDetails bagID={caseData.address.bag_id} />
            </> }
          { finesData && finesData.items.map(fine =>
            <Details
              key={fine.identificatienummer}
              title={`Vordering "${ fine.vorderingnummer }"`}
              values={fine as unknown as Record<string, string|number|JSX.Element|undefined|null>}
            />)
          }
        </>
      }
    />
  )
}

export default DetailsPage

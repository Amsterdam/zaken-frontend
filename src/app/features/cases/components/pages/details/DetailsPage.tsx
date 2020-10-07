import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, Heading } from "@datapunt/asc-ui"
import { Document } from "@datapunt/asc-assets"


import { useCase } from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"
import to from "app/features/shared/routing/to"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import SmallSkeleton from "app/features/shared/components/atoms/Skeleton/SmallSkeleton"
import LoadingDetails from "app/features/shared/components/molecules/Details/LoadingDetails"

import BagMap, { BagMapSkeleton } from "app/features/cases/components/organisms/BagMap/BagMap"
import BAGDetails from "app/features/cases/components/organisms/BagDetails/BagDetails"
import Residents from "app/features/cases/components/organisms/Residents/Residents"
import Fines from "app/features/cases/components/organisms/Fines/Fines"
import CaseDetails from "app/features/cases/components/organisms/CaseDetails/CaseDetails"
import PermitDetails from "app/features/cases/components/organisms/PermitDetails/PermitDetails"

import TableCaseVisits from "app/features/caseVisits/components/organisms/TableCaseVisits/TableCaseVisits"
import PanoramaPreview from "../../organisms/Panorama/PanoramaPreview"
import Row, { RowWithColumn } from "app/features/shared/components/atoms/Grid/Row"
import Column from "app/features/shared/components/atoms/Grid/Column"


type Props = {
  id: NonNullable<Components.Schemas.Case["identification"]>
}

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data: caseData } = useCase(id!)

  return (
    <DefaultLayout>
      <RowWithColumn>
          <Heading>{ caseData?.address?.full_address ?? <SmallSkeleton height={10}/> }</Heading>
      </RowWithColumn>
      <RowWithColumn>
          <ActionButtonWrap>
            <ButtonLink to={to("/cases/edit/:id", { id: id! })}>
              <Button as="span" variant="primary" iconLeft={<Document />}>Wijzig deze zaak</Button>
            </ButtonLink>
          </ActionButtonWrap>
      </RowWithColumn>
      <Row>
        <Column spanSmall={100} spanLarge={40}>
          { caseData?.address.bag_id
            ? <>
                <PanoramaPreview bagId={caseData.address.bag_id} />
                <BagMap bagId={caseData.address.bag_id} />
              </>
            : <BagMapSkeleton />
          }
        </Column>
        <Column spanSmall={100} spanLarge={60}>
          { caseData
            ? <CaseDetails caseData={caseData} />
            : <LoadingDetails numRows={2} />
          }
          { caseData?.address.bag_id
            ? <BAGDetails bagId={caseData.address.bag_id} />
            : <LoadingDetails numRows={5} />
          }
          <Residents id={ id! } />
          <Fines id={ id! } />
          { caseData?.address.bag_id
            ? <PermitDetails bagId={caseData.address.bag_id} />
            : <LoadingDetails numRows={2} />
          }
        </Column>
      </Row>
      <RowWithColumn>
        <Heading>Bezoeken</Heading>
        <TableCaseVisits />
      </RowWithColumn>
    </DefaultLayout>
  )
}

export default DetailsPage

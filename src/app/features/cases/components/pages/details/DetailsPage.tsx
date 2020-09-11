import React from "react"
import { RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { breakpoint, Button, themeSpacing } from "@datapunt/asc-ui"
import { Document } from "@datapunt/asc-assets/lib"


import { useCase } from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"
import to from "app/features/shared/routing/to"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import SmallSkeleton from "app/features/shared/components/atoms/Skeleton/SmallSkeleton"
import LoadingDetails from "app/features/shared/components/molecules/Details/LoadingDetails"
import Heading from "app/features/shared/components/atoms/Heading/Heading"

import BagMap, { BagMapSkeleton } from "app/features/cases/components/organisms/BagMap/BagMap"
import BAGDetails from "app/features/cases/components/organisms/BagDetails/BagDetails"
import Residents from "app/features/cases/components/organisms/Residents/Residents"
import Fines from "app/features/cases/components/organisms/Fines/Fines"
import CaseDetails from "app/features/cases/components/organisms/CaseDetails/CaseDetails"

import TableCaseVisits from "app/features/caseVisits/components/organisms/TableCaseVisits/TableCaseVisits"
import PanoramaPreview from "../../organisms/Panorama/PanoramaPreview"


type Props = {
  id: NonNullable<Components.Schemas.Case["identification"]>
}

const GUTTER = 6

const ColumnWrap = styled.div`
  display:flex;
  margin: 0 -${ themeSpacing(GUTTER) };
`

const Column = styled.div`
  flex:1;
  padding: 0 ${ themeSpacing(GUTTER) };

  @media screen and ${ breakpoint("min-width", "mobileS") } {
    &:nth-child(1) { display:none; }
  }

  @media screen and ${ breakpoint("min-width", "laptop") } {
    &:nth-child(1) { flex: 40%; display: block; }
    &:nth-child(2) { flex: 60%; }
  }
`

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data: caseData } = useCase(id!)

  return (
    <DefaultLayout>
      <Heading>{ caseData?.address?.full_address ?? <SmallSkeleton height={10}/> }</Heading>
      <ActionButtonWrap>
        <ButtonLink to={to("/cases/edit/:id", { id: id! })}>
          <Button as="span" variant="primary" iconLeft={<Document />}>Wijzig deze zaak</Button>
        </ButtonLink>
      </ActionButtonWrap>
      <ColumnWrap>
        <Column>
          { caseData?.address.bag_id
            ? <>
                <PanoramaPreview bagId={caseData.address.bag_id} />
                <BagMap bagId={caseData.address.bag_id} />
              </>
            : <BagMapSkeleton />
          }
        </Column>
        <Column>
          { caseData
            ? <CaseDetails caseData={caseData} />
            : <LoadingDetails numRows={2} />
          }
          { caseData?.address.bag_id
            ? <BAGDetails bagID={caseData.address.bag_id} />
            : <LoadingDetails numRows={5} />
          }
          <Residents id={ id! } />
          <Fines id={ id! } />
        </Column>
      </ColumnWrap>
      <Heading>Bezoeken</Heading>
      <TableCaseVisits />
    </DefaultLayout>
  )
}

export default DetailsPage

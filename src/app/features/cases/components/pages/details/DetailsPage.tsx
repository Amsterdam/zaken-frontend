import React from "react"
import { RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { breakpoint, Button, Heading, themeSpacing } from "@datapunt/asc-ui"
import { Document } from "@datapunt/asc-assets/lib"

import { useCase, useCaseFines } from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"
import to from "app/features/shared/routing/to"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import SmallSkeleton from "app/features/shared/components/atoms/Skeleton/SmallSkeleton"
import LoadingDetails from "app/features/shared/components/molecules/Details/LoadingDetails"

import BagMap, { BagMapSkeleton } from "app/features/cases/components/organisms/BagMap/BagMap"
import BAGDetails from "app/features/cases/components/organisms/BagDetails/BagDetails"
import FineDetails from "app/features/cases/components/organisms/FineDetails/FineDetails"
import CaseDetails from "app/features/cases/components/organisms/CaseDetails/CaseDetails"

type Props = {
  id: API.Case["identification"]
}

const GUTTER = 6

const Wrap = styled.div`
  display:flex;
  margin: 0 -${ themeSpacing(GUTTER) };  
`

const Column = styled.div`  
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
  const { data: caseData } = useCase(id)
  const { data: finesData } = useCaseFines(id)

  return (
    <DefaultLayout>
      <Heading>{ caseData?.address?.full_address ?? <SmallSkeleton height={10}/> }</Heading>
      <ActionButtonWrap>
        <ButtonLink to={to("/cases/edit/:id", { id: id })}>
          <Button as="span" variant="primary" iconLeft={<Document />}>Wijzig deze zaak</Button>
        </ButtonLink>
      </ActionButtonWrap>
      <Wrap>
        <Column>
          { caseData?.address.bag_id
            ? <BagMap bagId={caseData.address.bag_id} />
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
            : <LoadingDetails numRows={16} />
          }
          { finesData
            ? finesData.items.map(fine => <FineDetails fine={fine}/>)
            : <LoadingDetails numRows={20}/>
          }
        </Column>
      </Wrap>
    </DefaultLayout>
  )
}

export default DetailsPage

import React from "react"
import { RouteComponentProps } from "@reach/router"

import { useCase, useCaseFines } from "app/state/rest"

import Details from "app/features/shared/components/molecules/Details/Details"

import BagMap from "app/features/cases/components/organisms/BagMap/BagMap"
import BAGDetails from "app/features/cases/components/organisms/BagDetails/BagDetails"
import styled from "styled-components"
import { Button, Heading, themeSpacing } from "@datapunt/asc-ui"
import DefaultLayout from "../../../../shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "../../../../shared/components/atoms/ActionButtonWrap/ActionButtonWrap"
import to from "../../../../shared/routing/to"
import { Document } from "@datapunt/asc-assets/lib"
import ButtonLink from "../../../../shared/components/atoms/ButtonLink/ButtonLink"
import SmallSkeleton from "../../../../shared/components/atoms/Skeleton/SmallSkeleton"
import LoadingDetails from "../../../../shared/components/molecules/Details/LoadingDetails"

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
  
  &:nth-child(1) { flex: 40%; }
  &:nth-child(2) { flex: 60%; }  
`

const DetailsPage: React.FC<RouteComponentProps<Props>> = ({ id }) => {
  const { data: caseData, isBusy: isLoadingCaseData } = useCase(id)
  const { data: finesData, isBusy: isLoadingFines } = useCaseFines(id)

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
          { caseData?.address.bag_id && <BagMap bagId={caseData.address.bag_id} /> }
        </Column>
        <Column>
          { isLoadingCaseData || !caseData
            ? <LoadingDetails />
            : <BAGDetails bagID={caseData?.address.bag_id} />
          }
          {
            isLoadingFines || !finesData
              ? <LoadingDetails />
              : finesData.items.map(fine =>
                <Details
                  isLoading={isLoadingFines}
                  key={fine.identificatienummer}
                  title={`Vordering "${ fine.vorderingnummer }"`}
                  values={fine as unknown as Record<string, string | number | JSX.Element | undefined | null>}
                />)
          }
        </Column>
      </Wrap>
    </DefaultLayout>
  )
}

export default DetailsPage

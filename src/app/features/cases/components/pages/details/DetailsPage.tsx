import React from "react"
import { RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { breakpoint, Button, themeSpacing } from "@datapunt/asc-ui"
import { Document } from "@datapunt/asc-assets/lib"

import { useCase, useCaseFines } from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"
import to from "app/features/shared/routing/to"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"
import SmallSkeleton from "app/features/shared/components/atoms/Skeleton/SmallSkeleton"
import LoadingDetails from "app/features/shared/components/molecules/Details/LoadingDetails"
import Heading from "app/features/shared/components/atoms/Heading/Heading"

import BagMap, { BagMapSkeleton } from "app/features/cases/components/organisms/BagMap/BagMap"
import BAGDetails from "app/features/cases/components/organisms/BagDetails/BagDetails"
import FineSummary from "app/features/cases/components/organisms/FineSummary/FineSummary"
import CaseDetails from "app/features/cases/components/organisms/CaseDetails/CaseDetails"

import TableCaseVisits from "app/features/caseVisits/components/organisms/TableCaseVisits/TableCaseVisits"

import { useModal } from "app/features/shared/components/molecules/Modal/hooks/useModal"
import Modal from "app/features/shared/components/molecules/Modal/Modal"

type Props = {
  id: API.Case["identification"]
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
  const { data: caseData } = useCase(id)
  const { data: finesData } = useCaseFines(id)
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <DefaultLayout>
      <Heading>{ caseData?.address?.full_address ?? <SmallSkeleton height={10}/> }</Heading>
      <ActionButtonWrap>
        <ButtonLink to={to("/cases/edit/:id", { id: id })}>
          <Button as="span" variant="primary" iconLeft={<Document />}>Wijzig deze zaak</Button>
        </ButtonLink>
      </ActionButtonWrap>
      <ColumnWrap>
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
            : <LoadingDetails numRows={5} />
          }
          <Heading>
            { finesData?.items.length > 1 ? "Invorderingsbesluiten" : "Invorderingsbesluit" }
            <Button variant="blank" onClick={ () => openModal() }>?</Button>
            <Modal title="Verwerkingstijd" isOpen={isModalOpen} onClose={closeModal}>
              Belastingen pakt overgedragen beschikkingen in principe op binnen 5 werkdagen
            </Modal>

          </Heading>
          { finesData
            ? finesData.items.length
              ? finesData.items.map(fine => <FineSummary fine={fine} />)
              : "Geen"
            : <LoadingDetails numRows={3} title="" />
          }
        </Column>
      </ColumnWrap>
      <Heading>Bezoeken</Heading>
      <TableCaseVisits />
    </DefaultLayout>
  )
}

export default DetailsPage

import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button } from "@amsterdam/asc-ui"

import isValidUrlParamBAGId from "app/routing/utils/isValidUrlParamBAGId"
import { RowWithColumn } from "app/components/shared/components/atoms/Grid/Row"
import DefaultLayout from "app/components/shared/components/layouts/DefaultLayout/DefaultLayout"
import AddressHeader from "app/components/addresses/AddressHeader/AddressHeader"
import AddressMenu from "app/components/addresses/AddressMenu/AddressMenu"
import BreadCrumbs from "app/components/shared/components/molecules/BreadCrumbs/BreadCrumbs"
import PanoramaPreview from "app/components/shared/components/molecules/Panorama/PanoramaPreview"
import ButtonLink from "app/components/shared/components/atoms/ButtonLink/ButtonLink"
import to from "app/routing/utils/to"
import CasesByBagId from "app/components/addresses/CasesByBagId/CasesByBagId"
import NotFoundPage from "app/pages/errors/NotFoundPage"

type Props = {
  bagId: string
}

const IndexPage: React.FC<RouteComponentProps<Props>> = ({ bagId }) => (
  isValidUrlParamBAGId(bagId) ?
    <DefaultLayout>
      <RowWithColumn>
        <BreadCrumbs routeParams={ { bagId } } />
      </RowWithColumn>
      <RowWithColumn>
        <AddressHeader bagId={ bagId } headingSize="h1" isHeader={true} />
      </RowWithColumn>
      <RowWithColumn bottomSpacing={ 3 }>
        <PanoramaPreview bagId={ bagId } aspect={ 2.8 } fov={ 120 } />
      </RowWithColumn>
      <RowWithColumn>
        <AddressMenu bagId={ bagId } />
      </RowWithColumn>
      <RowWithColumn>
        <CasesByBagId
          bagId={ bagId }
          openCases={ true }
          title="Lopende zaken"
          emptyText="Op dit adres zijn er geen lopende zaken"
        />
      </RowWithColumn>
      <RowWithColumn>
        <ButtonLink to={ to("/adres/:bagId/zaken/nieuw", { bagId })}>
          <Button variant="primary" as="span">Nieuwe zaak aanmaken</Button>
        </ButtonLink>
      </RowWithColumn>
    </DefaultLayout> :
    <NotFoundPage />
)

export default IndexPage

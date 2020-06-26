import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, FormTitle, Heading } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets/lib"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import FormCreate from "app/features/cases/components/organisms/FormCreate/FormCreate"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"

type Props = {
  uuid: string
}

const EditPage: React.FC<RouteComponentProps<Props>> = ({ uuid }) => (
  <DefaultLayout>
    <Heading>Aanpassen zaak:  { uuid }</Heading>
    <ActionButtonWrap>
      <Button iconLeft={<TrashBin />} variant="secondary">Verwijder deze zaak</Button>
    </ActionButtonWrap>
    <FormTitle>Gebruik dit formulier een zaak te wijzigen</FormTitle>
    <FormCreate />
  </DefaultLayout>
)

export default EditPage

import React from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, FormTitle, Heading } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets/lib"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"
import FormEdit from "../../organisms/FormEdit/FormEdit"

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
    <FormEdit />
  </DefaultLayout>
)

export default EditPage

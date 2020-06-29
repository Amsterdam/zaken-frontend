import React, { useCallback, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, FormTitle, Heading } from "@datapunt/asc-ui"
import { TrashBin } from "@datapunt/asc-assets/lib"

import { useGlobalActions } from "app/state/state/globalState"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ActionButtonWrap from "app/features/shared/components/atoms/ActionButtonWrap/ActionButtonWrap"
import ConfirmModal from "app/features/shared/components/molecules/Modal/ConfirmModal"

import FormEdit from "app/features/cases/components/organisms/FormEdit/FormEdit"
import { useCaseByUUID } from "app/features/cases/hooks/useCaseByUUID"

type Props = {
  uuid: API.Case["uuid"]
}

const EditPage: React.FC<RouteComponentProps<Props>> = ({ uuid }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const { cases: { del } } = useGlobalActions()
  const { caseDetails } = useCaseByUUID(uuid!)

  const handleOnDeleteButtonClick = useCallback(() => setIsModalOpen(true), [ setIsModalOpen ])
  const handleOnModalClose = useCallback(() => setIsModalOpen(false), [ setIsModalOpen ])
  const handleOnDeleteConfirm = useCallback(() => del(caseDetails!), [ caseDetails, del ])

  return (
    <DefaultLayout>
      <Heading>Aanpassen zaak:  { uuid }</Heading>
      <ActionButtonWrap>
        <Button onClick={handleOnDeleteButtonClick} iconLeft={<TrashBin />} variant="secondary">Verwijder deze zaak</Button>
      </ActionButtonWrap>
      <FormTitle>Gebruik dit formulier een zaak te wijzigen</FormTitle>
      { caseDetails && <FormEdit caseDetails={caseDetails} /> }


      <ConfirmModal
        title="Weet je zeker dat je deze zaak wilt verwijderen?"
        isOpen={isModalOpen}
        onClose={handleOnModalClose}
        onConfirm={handleOnDeleteConfirm}
      >
        Let op! Deze actie kun je niet ongedaan worden gemaakt!
      </ConfirmModal>
    </DefaultLayout>
  )
}

export default EditPage

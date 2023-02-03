import { useState } from "react"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import { useCorporations, useAddresses, useCase } from "app/state/rest"
import ChangeableItem from "../ChangeableItem/ChangeableItem"
import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import ChangeHousingCorporationForm from "./ChangeHousingCorporationForm"
import SpinnerWrapper from "app/components/shared/SpinnerWrapper/SpinnerWrapper"

type Props = {
  housingCorporationId?: Components.Schemas.HousingCorporation["id"] | null
  bagId: Components.Schemas.Address["bag_id"]
  caseId: Components.Schemas.Case["id"]
}

const ChangeHousingCorporation: React.FC<Props> = ({ housingCorporationId, bagId, caseId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [loading, setLoading] = useState(false)
  const [caseItem, { updateCache }] = useCase(caseId)
  const [data] = useCorporations()
  const [, { execPatch }] = useAddresses(bagId, { lazy: true })

  const onSubmit = (housing_corporation: Components.Schemas.HousingCorporation["id"]) => {
    setLoading(true)
    execPatch({ housing_corporation })
      .then((response: any) => {
        // Update the case context for housing corporation
        const updatedCase = {
          ...caseItem,
          address: {
            ...caseItem?.address,
            housing_corporation: response.data.housing_corporation
          }
        }
        updateCache(() => updatedCase)
      })
      .finally(() => {
        setLoading(false)
        closeModal()
      })
  }

  let corporation: any = undefined
  if (housingCorporationId && data?.results) {
    corporation = data.results.find((corporation) => corporation.id === housingCorporationId)
  }

  return (
    <>
      <ChangeableItem
        name={ corporation?.name }
        titleAccess="Wijzig de woningcorporatie"
        onClick={ openModal }
      />
      <Modal
        isOpen={ isModalOpen }
        onClose={ closeModal }
        title="Wijzig woningcorporatie"
      >
        <SpinnerWrapper spinning={ loading }>
          <ModalBlock>
            <ChangeHousingCorporationForm
              onSubmit={ onSubmit }
              onCancel={ closeModal }
              housingCorporations={ data?.results || [] }
              housingCorporationId={ corporation?.id }
            />
          </ModalBlock>
        </SpinnerWrapper>
      </Modal>
    </>
  )
}

export default ChangeHousingCorporation

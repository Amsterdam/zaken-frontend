import { useEffect, useState } from "react"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import { useCorporations, useAddresses, useCase } from "app/state/rest"
import ChangeableItem from "../ChangeableItem/ChangeableItem"
import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import ChangeHousingCorporationForm from "./ChangeHousingCorporationForm"
import { SpinnerWrapper } from "app/components/shared/loading"

type Props = {
  housingCorporationId?: Components.Schemas.HousingCorporation["id"] | null
  bagId: Components.Schemas.Address["bag_id"]
  caseId: Components.Schemas.Case["id"]
}

const ChangeHousingCorporation: React.FC<Props> = ({ housingCorporationId, bagId, caseId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [loading, setLoading] = useState(false)
  const [housingCorporations, setHousingCorporations] = useState<Components.Schemas.HousingCorporation[]>([])
  const [caseItem, { updateCache }] = useCase(caseId)
  const [data] = useCorporations()
  const [, { execPatch }] = useAddresses(bagId, { lazy: true })

  useEffect(() => {
    if (data?.results) {
      // Add a null option for no housing corporation.
      let corporations: any = [...data?.results]
      corporations.push({ id: null, name: "Geen corporatie" })
      setHousingCorporations(corporations)
    }
  }, [data?.results])

  const onSubmit = (housing_corporation?: Components.Schemas.HousingCorporation["id"] | null) => {
    setLoading(true)
    execPatch({ housing_corporation })
      .then((response: any) => {
        // Update the case context for housing corporation
        if (response?.data) {
          const updatedCase = {
            ...caseItem,
            address: {
              ...caseItem?.address,
              housing_corporation: response.data.housing_corporation
            }
          }
          updateCache(() => updatedCase)
        }
      })
      .finally(() => {
        setLoading(false)
        closeModal()
      })
  }

  return (
    <>
      <ChangeableItem
        name={ housingCorporations.find((corporation) => corporation.id === housingCorporationId)?.name }
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
              housingCorporations={ housingCorporations }
              housingCorporationId={ housingCorporationId }
            />
          </ModalBlock>
        </SpinnerWrapper>
      </Modal>
    </>
  )
}

export default ChangeHousingCorporation

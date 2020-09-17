import React from "react"
import { Ellipsis } from "@datapunt/asc-assets"
import { Button } from "@datapunt/asc-ui"

import { useModal } from "app/features/shared/components/molecules/Modal/hooks/useModal"
import OtherAddressesModal from "./OtherAddressesModal"

type Props = {
  bagId: string
}

const ShowOtherAddressesButton: React.FC<Props> = ({ bagId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  return <>
    <Button variant="blank" icon={<Ellipsis />} onClick={openModal} />
    <OtherAddressesModal bagId={bagId} isOpen={isModalOpen} closeModal={closeModal} />
  </>
}

export default ShowOtherAddressesButton

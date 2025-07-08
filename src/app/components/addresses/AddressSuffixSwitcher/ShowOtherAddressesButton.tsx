import { Button, Icon } from "@amsterdam/asc-ui"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import OtherAddressesModal from "./OtherAddressesModal"
import { env } from "app/config/env"
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon"
import styles from "./ShowOtherAddressesButton.module.css"

export type Index = "first" | "last" | undefined
type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  index: Index
}

const renderIcon = (index: Index) => {
  switch (index) {
    case "first":
      return (
        <Icon size={32} className={styles.icon}>
          <CustomIcon name="ExpandMore" />
        </Icon>
      )
    case "last":
      return (
        <Icon size={32} className={styles.icon}>
          <CustomIcon name="ExpandLess" />
        </Icon>
      )
    default:
      return (
        <Icon
          size={32}
          className={styles.icon}
          iconUrl={`${env.VITE_AZA_FRONTEND_URL}/icons/chevron_up_down.svg`}
          inline
        />
      )
  }
}

const ShowOtherAddressesButton: React.FC<Props> = ({ bagId, index }) => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <div>
      <Button variant="blank" icon={renderIcon(index)} onClick={openModal} />
      <OtherAddressesModal
        bagId={bagId}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  )
}

export default ShowOtherAddressesButton

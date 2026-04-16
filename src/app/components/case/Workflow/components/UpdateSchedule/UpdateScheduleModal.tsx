import Modal, { ModalBlock } from "app/components/shared/Modal/Modal"
import UpdateScheduleForm from "./form/UpdateScheduleForm"
import { Schedule } from "./types"

export type Props = {
  isOpen: boolean
  closeModal: () => void
  onSubmit: (data: any) => void
  schedule: Schedule
  scheduleTypes: Components.Schemas.ThemeScheduleTypes
};

const UpdateScheduleModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  onSubmit,
  schedule,
  scheduleTypes,
}) => (
  <Modal isOpen={isOpen} onClose={closeModal} title="Wijzig planning bezoek">
    <ModalBlock>
      <UpdateScheduleForm
        onSubmit={onSubmit}
        onCancel={closeModal}
        schedule={schedule}
        scheduleTypes={scheduleTypes}
      />
    </ModalBlock>
  </Modal>
)

export default UpdateScheduleModal

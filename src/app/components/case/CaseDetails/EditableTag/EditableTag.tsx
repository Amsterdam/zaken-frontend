import { useModal } from "app/components/shared/Modal/hooks/useModal"
import ChangeTagModal from "./ChangeTagModal"
import CaseTags from "./CaseTags"

type Props = {
  case: Components.Schemas.CaseCreate
}

const EditableTag: React.FC<Props> = ({ case: caseItem }) => {
  const { tags } = caseItem
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <CaseTags tags={ tags } onClick={ openModal } />
      <ChangeTagModal
        isOpen={ isModalOpen }
        closeModal={ closeModal }
        case={ caseItem }
      />
    </>
  )
}

export default EditableTag

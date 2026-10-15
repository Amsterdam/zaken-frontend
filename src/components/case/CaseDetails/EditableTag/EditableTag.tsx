import { useState } from "react"
import CaseTags from "./CaseTags"
import ChangeTagDialog from "./ChangeTagDialog"

type Props = {
  case: components["schemas"]["CaseCreate"]
}

const EditableTag: React.FC<Props> = ({ case: caseItem }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <CaseTags tags={caseItem.tags} onClick={() => setIsDialogOpen(true)} />
      {isDialogOpen && (
        <ChangeTagDialog
          case={caseItem}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  )
}

export default EditableTag

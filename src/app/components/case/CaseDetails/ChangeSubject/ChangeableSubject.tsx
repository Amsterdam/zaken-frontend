import { useState } from "react"
import ChangeableItem from "../ChangeableItem/ChangeableItem"
import ChangeSubjectDialog from "./ChangeSubjectDialog"

type Props = {
  caseId: components["schemas"]["CaseCreate"]["id"]
  themeId: components["schemas"]["CaseTheme"]["id"]
  subjects: components["schemas"]["Subject"][]
}

const ChangeableSubject: React.FC<Props> = ({ subjects, caseId, themeId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <ChangeableItem
        name={
          subjects?.length > 0
            ? subjects.map((subject) => subject.name).join(", ")
            : "Geen onderwerp"
        }
        titleAccess="Wijzig het onderwerp"
        onClick={() => setIsDialogOpen(true)}
      />
      {isDialogOpen && (
        <ChangeSubjectDialog
          caseId={caseId}
          themeId={themeId}
          subjects={subjects ?? []}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  )
}

export default ChangeableSubject

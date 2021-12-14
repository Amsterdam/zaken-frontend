import styled from "styled-components"
import { Icon, themeSpacing } from "@amsterdam/asc-ui"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import { Edit } from "app/components/shared/Icons"
import ChangeSubjectModal from "./ChangeSubjectModal"
import { useTaskUpdate } from "app/state/rest"

type Props = {
  caseId: Components.Schemas.Case["id"]
  caseUserTaskId?: Components.Schemas.CaseUserTask["task_id"]
  subjects?: Components.Schemas.Subject[]
}

const Span = styled.span`
  display: flex;
  align-items: center;
  white-space: nowrap;
  height: ${ themeSpacing(5) };
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const StyledIcon = styled(Icon)`
  display: inline-block;
  margin-left: ${ themeSpacing(2) };
`

const ChangeableSubject: React.FC<Props> = ({ subjects, caseId, caseUserTaskId = "123" }) => {

  const { isModalOpen, openModal, closeModal } = useModal()
  console.log("subjects", subjects?.map(subject => subject.name))

  // TODO useSubject here
  const [, { execPatch }] = useTaskUpdate(caseUserTaskId)

  const onSubmit = (data: { date: string, id: string }) => {
    console.log("onSubmit, data", data)
    // appendTimeToDate(data.date) !== dueDate 
    //   ? execPatch( { due_date: appendTimeToDate( data.date ) })
    //   : closeModal()
  }

  return (
    <>
      <Span
        role="link"
        onClick={ openModal }
        >
        { subjects?.map(subject => subject.name).join(", ")}
        <StyledIcon size={ 20 }><Edit titleAccess="Pas het onderwerp aan" /></StyledIcon>
      </Span>
      <ChangeSubjectModal
        onSubmit={ onSubmit }
        isOpen={ isModalOpen }
        closeModal={ closeModal }
        subjects={ subjects }
        taskId={ caseUserTaskId }
        />
    </>
  )
}

export default ChangeableSubject

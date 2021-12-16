import styled from "styled-components"
import { Icon, themeSpacing } from "@amsterdam/asc-ui"
import { useModal } from "app/components/shared/Modal/hooks/useModal"
import { Edit } from "app/components/shared/Icons"
import ChangeSubjectModal from "./ChangeSubjectModal"
import { useCase } from "app/state/rest"

type Props = {
  caseId: Components.Schemas.Case["id"]
  themeId: Components.Schemas.CaseTheme["id"]
  subjects: Components.Schemas.Subject[]
}

const Span = styled.span`
  cursor: pointer;
  position: relative;
  &:hover {
    text-decoration: underline;
  }
  svg {
    position: absolute;
    bottom: 0;
    left: 100%;
  }
`

const StyledIcon = styled(Icon)`
  display: inline-block;
  margin-left: ${ themeSpacing(2) };
`

const ChangeableSubject: React.FC<Props> = ({ subjects, caseId, themeId }) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [, { execPatch }] = useCase(caseId)

  const onSubmit = (data: any) => {
    execPatch( { subject_ids: data.subjects.map((subject: any) => subject.id) }) 
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
        themeId={ themeId }
      />
    </>
  )
}

export default ChangeableSubject

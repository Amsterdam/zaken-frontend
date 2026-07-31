import { useModal } from "app/components/shared/Modal/hooks/useModal";
import { useCase } from "app/state/rest";
import ChangeSubjectModal from "./ChangeSubjectModal";
import ChangeableItem from "../ChangeableItem/ChangeableItem";

type Props = {
  caseId: components["schemas"]["CaseCreate"]["id"]
  themeId: components["schemas"]["CaseTheme"]["id"]
  subjects: components["schemas"]["Subject"][]
}

const ChangeableSubject: React.FC<Props> = ({ subjects, caseId, themeId }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [, { execPatch }] = useCase(caseId);

  const onSubmit = (data: { subjects: components["schemas"]["Subject"][] }) => {
    execPatch( { subject_ids: data.subjects.map((subject: components["schemas"]["Subject"]) => subject.id) });
  };

  return (
    <>
      <ChangeableItem
        name={ subjects?.map(subject => subject.name).join(", ") }
        titleAccess="Wijzig het onderwerp"
        onClick={ openModal }
      />
      <ChangeSubjectModal
        onSubmit={ onSubmit }
        isOpen={ isModalOpen }
        closeModal={ closeModal }
        subjects={ subjects }
        themeId={ themeId }
      />
    </>
  );
};

export default ChangeableSubject;

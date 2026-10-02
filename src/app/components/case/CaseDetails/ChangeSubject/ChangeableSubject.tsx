import { useModal } from "app/components/shared/Modal/hooks/useModal";
import { useUpdateCase } from "@/api/hooks";
import ChangeSubjectModal from "./ChangeSubjectModal";
import ChangeableItem from "../ChangeableItem/ChangeableItem";

type Props = {
  caseId: components["schemas"]["CaseCreate"]["id"]
  themeId: components["schemas"]["CaseTheme"]["id"]
  subjects: components["schemas"]["Subject"][]
}

const ChangeableSubject: React.FC<Props> = ({ subjects, caseId, themeId }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { mutate: updateCase } = useUpdateCase(caseId);

  const onSubmit = (data: { subjects: components["schemas"]["Subject"][] }) => {
    updateCase(
      { subject_ids: data.subjects.map((subject: components["schemas"]["Subject"]) => subject.id) },
      { onSettled: closeModal },
    );
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

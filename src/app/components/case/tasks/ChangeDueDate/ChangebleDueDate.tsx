import styled from "styled-components";
import { Icon, themeSpacing } from "@amsterdam/asc-ui";
import { useModal } from "app/components/shared/Modal/hooks/useModal";
import { appendTimeToDate } from "app/components/shared/Helpers/helpers";
import DueDate from "app/components/shared/DueDate/DueDate";
import ChangeDueDateModal from "./ChangeDueDateModal";
import { useUpdateTask } from "@/api/hooks";
import useHasPermission, { CAN_PERFORM_TASK } from "app/state/rest/custom/usePermissions/useHasPermission";
import CustomIcon from "app/components/shared/CustomIcon/CustomIcon";

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
  dueDate: Tasks.WorkflowTask["due_date"]
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
`;

const StyledIcon = styled(Icon)`
  display: inline-block;
  margin-left: ${ themeSpacing(2) };
`;

const ChangeableDueDate: React.FC<Props> = ({ dueDate, caseId, caseUserTaskId }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { mutate: updateTask } = useUpdateTask(caseUserTaskId, caseId);
  const [hasPermission] = useHasPermission([CAN_PERFORM_TASK]);

  const onSubmit = (data: { date: string, id: string }) => {
    if (appendTimeToDate(data.date) !== dueDate) {
      updateTask({ due_date: appendTimeToDate(data.date) }, { onSettled: closeModal });
    } else {
      closeModal();
    }
  };

  return hasPermission ? (
    <>
      <Span
        role="link"
        onClick={ openModal }
        >
        <DueDate date={ dueDate } />
        <StyledIcon size={ 20 }><CustomIcon name="Edit" titleAccess="Pas de slotdatum aan" /></StyledIcon>
      </Span>
      <ChangeDueDateModal
        onSubmit={ onSubmit }
        isOpen={ isModalOpen }
        closeModal={ closeModal }
        dueDate={ dueDate }
        taskId={ caseUserTaskId }
        />
    </>
  ) : <DueDate date={ dueDate } />;
};

export default ChangeableDueDate;

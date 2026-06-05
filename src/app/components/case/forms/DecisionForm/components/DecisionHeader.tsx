import { useSummonsWithCaseId } from "app/state/rest";
import useValues from "../hooks/useValues";
import { DefinitionList } from "@amsterdam/wonen-ui";

type Workflow = {
  tasks: Tasks.WorkflowTask[];
};

type Props = {
  caseId: Components.Schemas.CaseDetail["id"];
  caseUserTaskId: string;
  workflows: Workflow[];
};

const DecisionHeader: React.FC<Props> = ({
  caseId,
  caseUserTaskId,
  workflows,
}) => {
  const [summons, { isBusy }] = useSummonsWithCaseId(caseId);

  const task = workflows
    ?.flatMap(({ tasks }) => tasks)
    .find((task) => String(task.case_user_task_id) === caseUserTaskId);

  const summonId = task?.form_variables?.summon_id?.value;
  const summon = summons?.results?.find(({ id }) => id === summonId);
  const values = useValues(summon);

  return (
    <DefinitionList
      loading={isBusy}
      numLoadingRows={2}
      title="Besluit naar aanleiding van"
      headingSize="h4"
      data={values}
      emptyPlaceholder="Geen aanschrijving aanwezig"
    />
  );
};

export default DecisionHeader;

import { FormTitle } from '@amsterdam/asc-ui';

import useScaffoldedFields from 'app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields';
import WorkflowForm from 'app/components/case/WorkflowForm/WorkflowForm';
import { useCase, useDebriefingCreate, useViolationTypes } from 'app/state/rest';
import scaffold from './scaffold';

type Props = {
  id: Components.Schemas.Case['id']
  caseUserTaskId: Components.Schemas.CaseUserTaskWorkdflow['case_user_task_id']
}

const DebriefCreateForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const [caseItem] = useCase(id);
  const themeId = caseItem?.theme.id;
  const themeName = caseItem?.theme.name;
  const [data] = useViolationTypes(themeId);
  const violationTypes = data?.results;
  const [, { execPost }] = useDebriefingCreate();
  const fields = useScaffoldedFields(scaffold, id, violationTypes, themeName);

  // Nuisance is an array but a boolean is expected.
  const mapData = (data: any) => ({
    ...data,
    nuisance_detected: data.nuisance_detected ? data.nuisance_detected.includes('nuisance_detected') : false,
  });

  return (
    <>
      <FormTitle>Geef terugkoppeling van de gehouden debrief</FormTitle>
      <WorkflowForm
        id={id}
        fields={fields}
        postMethod={execPost}
        caseUserTaskId={caseUserTaskId}
        mapData={mapData}
      />
    </>
  );
};

export default DebriefCreateForm;

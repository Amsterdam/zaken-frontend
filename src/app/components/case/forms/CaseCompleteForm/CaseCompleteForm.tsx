
import { FormTitle } from "@amsterdam/asc-ui";

import { useCase, useCaseCloseReasons, useCaseCloseResults, useCloseCase } from "@/api/hooks";
import { toPostMethod } from "@/api/utils/toPostMethod";
import WorkflowForm from "app/components/case/WorkflowForm/WorkflowForm";
import scaffold from "app/components/case/forms/CaseCompleteForm/scaffold";
import useScaffoldedFields from "app/components/shared/ConfirmScaffoldForm/hooks/useScaffoldedFields";
import useNavigation from "app/routing/useNavigation";

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
}

type CaseCloseTypeFormData = Omit<components["schemas"]["CaseClose"], "reason" | "result"> & {
  reason: components["schemas"]["CaseCloseReason"]
  result: components["schemas"]["CaseCloseResult"] | null
}
const mapData = (data: CaseCloseTypeFormData): components["schemas"]["CaseClose"] => (
  {
    ...data,
    reason: data.reason.id,
    result: data.result?.id ?? null,
  }
);

const CaseCompleteForm: React.FC<Props> = ({ id, caseUserTaskId }) => {
  const { data: caseItem } = useCase(id);
  const { navigateTo } = useNavigation();
  const themeId = caseItem?.theme.id;
  const { data: caseCloseReasons } = useCaseCloseReasons(themeId);
  const { data: caseCloseResults } = useCaseCloseResults(themeId);
  const closeCase = toPostMethod(useCloseCase(id).mutateAsync);
  const fields = useScaffoldedFields(scaffold, id, navigateTo, caseCloseReasons?.results, caseCloseResults?.results);

  return (
    <>
      <FormTitle>Gebruik dit formulier om de zaak af te ronden</FormTitle>
      <WorkflowForm
        id={ id }
        fields={ fields }
        mapData={ mapData }
        postMethod={ closeCase }
        caseUserTaskId={ caseUserTaskId }
      />
    </>
  );
};

export default CaseCompleteForm;
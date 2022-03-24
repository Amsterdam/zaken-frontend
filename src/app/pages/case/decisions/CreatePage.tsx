import { RouteComponentProps } from '@reach/router';

import DefaultLayout from 'app/components/layouts/DefaultLayout/DefaultLayout';
import PageHeading from 'app/components/shared/PageHeading/PageHeading';
import Row, { RowWithColumn } from 'app/components/layouts/Grid/Row';
import parseUrlParamId from 'app/routing/utils/parseUrlParamId';
import isValidUrlParamId from 'app/routing/utils/isValidUrlParamId';
import NotFoundPage from 'app/pages/errors/NotFoundPage';
import CaseHeading from 'app/components/case/CaseHeading/CaseHeading';
import { Column } from 'app/components/layouts/Grid';
import DecisionForm from 'app/components/case/forms/DecisionForm/DecisionForm';

type Props = {
  id: string
  caseUserTaskId: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString, caseUserTaskId }) => {
  const id = parseUrlParamId(idString);

  return (
    isValidUrlParamId<Components.Schemas.Case['id']>(id)
    && isValidUrlParamId<Components.Schemas.CaseUserTaskWorkdflow['case_user_task_id']>(caseUserTaskId)
      ? (
        <DefaultLayout>
          <RowWithColumn>
            <PageHeading />
          </RowWithColumn>
          <RowWithColumn>
            <CaseHeading id={id} />
          </RowWithColumn>
          <Row>
            <Column spanLarge={50}>
              <DecisionForm id={id} caseUserTaskId={caseUserTaskId} />
            </Column>
          </Row>
        </DefaultLayout>
      )
      : <NotFoundPage />
  );
};

export default CreatePage;

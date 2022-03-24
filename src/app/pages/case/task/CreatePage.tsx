import { RouteComponentProps } from '@reach/router';

import parseUrlParamId from 'app/routing/utils/parseUrlParamId';
import isValidUrlParamId from 'app/routing/utils/isValidUrlParamId';
import DefaultLayout from 'app/components/layouts/DefaultLayout/DefaultLayout';
import PageHeading from 'app/components/shared/PageHeading/PageHeading';
import Row, { RowWithColumn } from 'app/components/layouts/Grid/Row';
import CaseHeading from 'app/components/case/CaseHeading/CaseHeading';
import { Column } from 'app/components/layouts/Grid';
import TaskForm from 'app/components/case/forms/TaskForm/TaskForm';
import NotFoundPage from 'app/pages/errors/NotFoundPage';

type Props = {
  id: string
}

const CreatePage: React.FC<RouteComponentProps<Props>> = ({ id: idString }) => {
  const id = parseUrlParamId(idString);

  return (
    isValidUrlParamId<Components.Schemas.Case['id']>(id)
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
              <TaskForm id={id} />
            </Column>
          </Row>
        </DefaultLayout>
      )
      : <NotFoundPage />
  );
};

export default CreatePage;

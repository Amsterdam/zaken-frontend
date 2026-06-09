import { Button, Heading } from "@amsterdam/asc-ui";
import { useTaskComplete, useCaseWorkflows, useCase } from "app/state/rest";
import getColumns from "./columns";
import { LoadingRows, Table } from "@amsterdam/wonen-ui";
import usePollingRefetch from "app/state/rest/hooks/usePollingRefetch";
import styles from "./Workflow.module.css";

type Props = {
  id: Components.Schemas.CaseDetail["id"];
};

const Workflow: React.FC<Props> = ({ id }) => {
  const [, { execPost }] = useTaskComplete({ lazy: true });
  const [data, { isBusy, execGet }] = useCaseWorkflows(id);
  const [caseData] = useCase(id);

  const workflows = data?.results ?? [];
  const isClosed = caseData?.end_date !== null;

  const shouldPoll = !isClosed || workflows.length > 0;
  const isPolling = usePollingRefetch(workflows, execGet, shouldPoll);

  if ((isBusy || isPolling) && workflows.length === 0) {
    return <LoadingRows numRows={2} />;
  }

  const onClickLink = (e: React.MouseEvent) => {
    e.preventDefault();
    execGet();
  };

  return (
    <>
      {workflows.length > 0 ? (
        workflows.map(({ state, tasks, information }, index) => {
          const columns = getColumns(execPost, tasks, caseData?.theme.id);

          return (
            <div className={styles.wrap} key={`${state.name}_${index}`}>
              <div className={styles.content}>
                <Heading as="h4">{state.name}</Heading>
                {information && <p>{information}</p>}
              </div>
              <Table
                columns={columns}
                lastColumnFixed
                data={tasks || []}
                pagination={false}
              />
            </div>
          );
        })
      ) : (
        <>
          <>
            {isClosed
              ? "Deze zaak is afgesloten, er zijn op dit moment geen open taken."
              : "Geen taken beschikbaar."}{" "}
          </>
          <Button variant="textButton" onClick={onClickLink}>
            Herlaad taken.
          </Button>
        </>
      )}
    </>
  );
};

export default Workflow;

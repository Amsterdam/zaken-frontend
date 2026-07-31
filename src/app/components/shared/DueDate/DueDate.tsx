import { DateDisplay } from "@amsterdam/wonen-ui";
import isDateInPast from "../Date/isDateInPast";

type Props = {
  date: Tasks.WorkflowTask["due_date"] | undefined;
  emptyText?: string;
};

const DueDate: React.FC<Props> = ({ date, emptyText }) =>
  date !== undefined && isDateInPast(new Date(date)) ? (
    <span style={{ color: "#ec0000" }}>
      <DateDisplay date={date} />
    </span>
  ) : (
    <DateDisplay date={date} emptyText={emptyText} />
  );

export default DueDate;

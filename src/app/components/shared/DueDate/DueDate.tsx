import { DateDisplay } from "@amsterdam/wonen-ui";
import isDateInPast from "../Date/isDateInPast";
import styles from "./DueDate.module.css";

type Props = {
  date: Tasks.WorkflowTask["due_date"] | undefined;
  emptyText?: string;
};

const DueDate: React.FC<Props> = ({ date, emptyText }) =>
  date !== undefined && isDateInPast(new Date(date)) ? (
    <DateDisplay date={date} className={styles.invalid} />
  ) : (
    <DateDisplay date={date} emptyText={emptyText} />
  );

export default DueDate;

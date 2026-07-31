import { Spinner } from "@amsterdam/asc-ui";
import styles from "./SpinnerWrap.module.css";

const SpinnerWrap: React.FC = () => (
  <div className={ styles.div }>
    <Spinner size={ 36 } />
  </div>
);

export default SpinnerWrap;

import { Spinner } from "@amsterdam/asc-ui";
import styles from "./SpinnerWrapper.module.css";

type Props = {
  spinning?: boolean;
  children: React.ReactNode;
};

export const SpinnerWrapper: React.FC<Props> = ({
  spinning = true,
  children,
}) => (
  <div>
    {spinning && (
      <div className={ styles.spinnerContainer }>
        <Spinner />
      </div>
    )}
    {children}
  </div>
);

export default SpinnerWrapper;

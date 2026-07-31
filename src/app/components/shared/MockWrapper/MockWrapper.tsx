import { env } from "app/config/env";
import styles from "./MockWrapper.module.css";

type Props = {
  hasPadding?: boolean
  children: React.ReactNode
}

const MockWrapper: React.FC<Props> = ({ hasPadding = true, children }) => {
  const isProduction = env.VITE_ENVIRONMENT === "production";
  const className = [
    styles.div,
    !isProduction && styles.notProduction,
    !isProduction && hasPadding && styles.hasPadding,
  ].filter(Boolean).join(" ");

  return <div className={ className }>{ children }</div>;
};
export default MockWrapper;

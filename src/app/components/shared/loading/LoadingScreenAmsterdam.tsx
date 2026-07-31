import type { CSSProperties } from "react";
import styles from "./LoadingScreenAmsterdam.module.css";

type CrossProps = {
  duration: number
  delay: number
}

const Cross: React.FC<CrossProps> = ({ duration, delay }) => (
  <div
    className={ styles.cross }
    style={ { "--duration": `${ duration }s`, "--delay": `${ delay }s` } as CSSProperties }
  />
);

export const LoadingScreenAmsterdam: React.FC = () => (
  <div className={ styles.centerWrapper }>
    <Cross duration={3} delay={0} />
    <Cross duration={3} delay={0} />
    <Cross duration={3} delay={0} />
  </div>
);

export default LoadingScreenAmsterdam;

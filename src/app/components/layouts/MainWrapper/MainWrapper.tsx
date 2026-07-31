import { type ReactNode } from "react";
import styles from "./MainWrapper.module.css";

const MainWrapper = ({ children }: { children: ReactNode }) => (
  <main className={ styles.main } id="a11y_content">{children}</main>
);

export default MainWrapper;

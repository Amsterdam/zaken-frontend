import { type ReactNode } from "react";
import styles from "./BlockMenu.module.css";

const BlockMenu = ({ children }: { children: ReactNode }) => (
  <div className={ styles.div }>{children}</div>
);
export default BlockMenu;

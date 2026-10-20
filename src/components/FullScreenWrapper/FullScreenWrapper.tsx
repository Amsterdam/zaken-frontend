import type { ReactNode } from "react"
import styles from "./FullScreenWrapper.module.css"

/** A message in the middle of the screen, e.g. when signing in failed. */
export const FullScreenWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => <div className={styles.fullScreenWrapper}>{children}</div>

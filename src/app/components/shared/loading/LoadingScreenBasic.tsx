import type { CSSProperties, ReactNode } from "react";
import styles from "./LoadingScreenBasic.module.css";

export const FullScreenWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className={ styles.fullScreenWrapper }>{ children }</div>
);

export const BasicSpinner: React.FC<{
  color?: string
  size?: number
}> = ({ color, size }) => (
  <div
    className={ styles.basicSpinner }
    style={ {
      "--color": color,
      "--size": size !== undefined ? `${ size }px` : undefined,
    } as CSSProperties }
  />
);

export const LoadingScreenBasic: React.FC<{
  color?: string
  size?: number
}> = ({ color = "#ec0000", size = 60 }) => (
  <FullScreenWrapper>
    <BasicSpinner color={ color } size={ size } />
  </FullScreenWrapper>
);

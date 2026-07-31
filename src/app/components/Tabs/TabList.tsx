import { forwardRef } from "react";
import styles from "./TabList.module.css";

const TabList = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      role="tablist"
      ref={ ref }
      className={ [styles.tabList, className].filter(Boolean).join(" ") }
      { ...props }
    />
  ),
);

export default TabList;

import styles from "./TabButton.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { isSelected?: boolean }

const TabButton: React.FC<Props> = ({ isSelected, className, ...props }) => (
  <button
    role="tab"
    className={ [styles.tabButton, isSelected && styles.isSelected, className].filter(Boolean).join(" ") }
    { ...props }
  />
);

export default TabButton;

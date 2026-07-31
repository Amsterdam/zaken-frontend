import styles from "./FeedbackButton.module.css";

type Props = {
  onClick?: () => void
}

const FeedbackButton: React.FC<Props> = props => (
  <div className={ styles.feedbackButton } { ...props } />
);

export default FeedbackButton;

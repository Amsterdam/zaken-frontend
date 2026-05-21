import CustomIcon from "../CustomIcon/CustomIcon";
import styles from "./InfoAlert.module.css";

type InfoAlertProps = {
  title?: string;
  message?: string;
};

const InfoAlert: React.FC<InfoAlertProps> = ({
  title = "Vul de gegevens aan",
  message = "Sommige verplichte velden zijn nog niet ingevuld.",
}) => (
  <div className={styles.container}>
    <div className={styles.titleWrapper}>
      <CustomIcon name="Info" size={24} color="#009de6" />
      <div className={styles.title}>{title}</div>
    </div>
    <div>{message}</div>
  </div>
);

export default InfoAlert;

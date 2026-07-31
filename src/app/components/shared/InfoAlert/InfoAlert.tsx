import CustomIcon from "../CustomIcon/CustomIcon";

type InfoAlertProps = {
  title?: string;
  message?: string;
};

const InfoAlert: React.FC<InfoAlertProps> = ({
  title = "Vul de gegevens aan",
  message = "Sommige verplichte velden zijn nog niet ingevuld.",
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <CustomIcon name="Info" size={24} color="#009de6" />
      <div style={{ fontWeight: 700 }}>{title}</div>
    </div>
    <div>{message}</div>
  </div>
);

export default InfoAlert;

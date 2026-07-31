// Be careful
// ==========
// BWV data has the fields `suffix` and `suffix_letter`
// `suffix_letter` = `suffix`
// `suffix` = `etage`
type Props = {
  streetName: string;
  streetNumber: string | number;
  suffix?: string;
  etage?: string | number;
};

const AddressDisplay: React.FC<Props> = ({
  streetName,
  streetNumber,
  suffix,
  etage,
}) => (
  <>
    {streetName}{" "}
    <span style={{ whiteSpace: "nowrap" }}>
      {`${streetNumber}${suffix ? suffix : ""}${etage ? `-${etage}` : ""}`.trim()}
    </span>
  </>
);

export default AddressDisplay;

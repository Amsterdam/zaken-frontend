import AddressDisplay from "../AddressDisplay/AddressDisplay";
import PostalCodeDisplay from "../PostalCodeDisplay/PostalCodeDisplay";

type Props = {
  streetName?: string | null;
  streetNumber?: string | number | null;
  suffix?: string | null;
  etage?: string | number | null;
  postalCode?: string | null;
  city?: string;
};

const FullAddressDisplay: React.FC<Props> = ({
  streetName,
  streetNumber,
  suffix,
  etage,
  postalCode,
  city,
}) => (
  <>
    <AddressDisplay
      streetName={streetName ?? ""}
      streetNumber={streetNumber ?? ""}
      suffix={suffix ?? undefined}
      etage={etage ?? undefined}
    />
    {postalCode && (
      <>
        , <PostalCodeDisplay postalCode={postalCode} />
      </>
    )}
    {city ? ` ${city}` : ""}
  </>
);

export default FullAddressDisplay;

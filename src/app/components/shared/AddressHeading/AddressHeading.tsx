import { Heading } from "@amsterdam/asc-ui";
import { useCase } from "app/state/rest";
import AddressDisplay from "app/components/addresses/AddressDisplay/AddressDisplay";

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"];
};

const AddressHeading: React.FC<Props> = ({ caseId }) => {
  const [data] = useCase(caseId);

  return (
    <>
      <Heading as="h3">Adres</Heading>
      {data && (
        <div style={{ marginBottom: 28 }}>
          <p>
            <AddressDisplay
              streetName={data.address.street_name ?? ""}
              streetNumber={data.address.number ?? ""}
              suffix={data.address.suffix_letter ?? undefined}
              etage={data.address.suffix ?? undefined}
            />
          </p>
          <p>{data.address.postal_code} Amsterdam</p>
        </div>
      )}
    </>
  );
};
export default AddressHeading;

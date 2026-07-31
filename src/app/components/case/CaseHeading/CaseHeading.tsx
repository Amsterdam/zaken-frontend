
import { Heading, Spinner } from "@amsterdam/asc-ui";
import { CaseIdDisplay } from "@amsterdam/wonen-ui";
import styles from "./CaseHeading.module.css";

import { useCase } from "app/state/rest";
import FullAddressDisplay from "app/components/addresses/FullAddressDisplay/FullAddressDisplay";

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
}

const CaseHeading: React.FC<Props> = ({ id }) => {

  const [data] = useCase(id);

  return (
    <>
      <Heading as="h3">Zaak</Heading>
      { data === undefined ?
        <Spinner /> :
        <dl>
          <div className={ styles.div }>
            <dt className={ styles.dt }>Adres</dt>
            <dd>
              <FullAddressDisplay
                streetName={ data?.address?.street_name }
                streetNumber={ data?.address?.number }
                suffix={ data?.address?.suffix_letter }
                etage={ data?.address?.suffix }
                postalCode={ data?.address?.postal_code }
                city={ "Amsterdam" }
              />
            </dd>
          </div>
          <div className={ styles.div }>
            <dt className={ styles.dt }>Zaak ID</dt>
            <dd>
              <CaseIdDisplay id={ data?.id } />
            </dd>
          </div>
        </dl>
      }
    </>
  );
};
export default CaseHeading;

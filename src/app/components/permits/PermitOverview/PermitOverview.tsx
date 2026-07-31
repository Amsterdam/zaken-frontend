import { Spinner, Heading, Paragraph } from "@amsterdam/asc-ui";
import { Link } from "react-router-dom";
import { DefinitionList } from "@amsterdam/wonen-ui";
import styles from "./PermitOverview.module.css";

import to from "app/routing/utils/to";
import { usePermitDetails } from "app/state/rest";
import usePermitValues from "./hooks/usePermitValues";

type Props = {
  bagId: string
}

const PermitOverview: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = usePermitDetails(bagId);
  const values = usePermitValues(data);

  if (isBusy) {
    return <Spinner />;
  }
  return (
    <>
      { values === undefined ? (
        <>
          <Heading forwardedAs="h2">Vergunningen</Heading>
          <Paragraph>Geen vergunningen gevonden</Paragraph>
        </>
      ) : (
        <DefinitionList loading={ isBusy } numLoadingRows={ 2 } title="Vergunningen" data={ values } />
      )
      }
      <Link className={ styles.styledLink } to={ to("/adres/:bagId/vergunningen", { bagId }) } >Alle vergunningen details</Link>
    </>
  );
};

export default PermitOverview;

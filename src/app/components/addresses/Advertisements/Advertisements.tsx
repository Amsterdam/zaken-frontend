import {
  Spinner, Heading, Paragraph, Link, themeSpacing,
} from '@amsterdam/asc-ui';
import styled from 'styled-components';
import { useCasesByBagId } from 'app/state/rest';

type Props = {
  bagId: Components.Schemas.Address['bag_id']
}

const StyledLink = styled(Link)`
  font-size: 18px;
  margin-bottom: ${themeSpacing(3)};
`;

const IS_OPEN_CASES = true;

const Advertisements: React.FC<Props> = ({ bagId }) => {
  const [data, { isBusy }] = useCasesByBagId(bagId, IS_OPEN_CASES);
  const cases = data?.results || [];
  let mergedAds: Components.Schemas.Advertisement[] = [];
  // Merge all advertisement arrays to one.
  cases.forEach((c) => {
    if (c.advertisements !== undefined && c.advertisements?.length > 0) {
      mergedAds = [...mergedAds, ...c.advertisements];
    }
  });
  // Filter for unique advertisements.
  const uniqueAds = mergedAds.filter((value, index, self) => self.findIndex((v) => v.link === value.link) === index);

  if (isBusy) {
    return <Spinner />;
  }
  return (
    <>
      <Heading forwardedAs="h2">Advertenties</Heading>
      { uniqueAds.length > 0 ? (
        <>
          { uniqueAds.map((ad) => (
            <div>
              <StyledLink href={ad.link} variant="inline" icon="external" target="_blank" rel="noopener noreferrer">
                {ad.link}
              </StyledLink>
            </div>
          ))}
        </>
      ) : (
        <Paragraph>Geen advertenties gevonden</Paragraph>
      )}
    </>
  );
};

export default Advertisements;

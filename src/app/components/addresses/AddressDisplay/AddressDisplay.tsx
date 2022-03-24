import styled from 'styled-components';

// Be careful
// ==========
// BWV data has the fields `suffix` and `suffix_letter`
// `suffix_letter` = `suffix`
// `suffix` = `etage`
type Props = {
  streetName: string
  streetNumber: string | number
  suffix?: string
  etage?: string | number
}

const NoWrap = styled.span`
  white-space: nowrap;
`;

const AddressDisplay: React.FC<Props> = ({
  streetName, streetNumber, suffix, etage,
}) => (
  <>
    { streetName }
    {' '}
    <NoWrap>{ `${streetNumber}${suffix || ''}${etage ? `-${etage}` : ''}`.trim() }</NoWrap>
  </>
);

export default AddressDisplay;

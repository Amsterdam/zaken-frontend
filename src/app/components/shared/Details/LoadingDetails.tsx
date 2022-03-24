import Details from './Details';

type Props = {
  numRows: number
}

const LoadingDetails: React.FC<Props> = ({ numRows }) => (
  <Details isLoading title="loading" values={{}} numLoadingRows={numRows} />
);

export default LoadingDetails;

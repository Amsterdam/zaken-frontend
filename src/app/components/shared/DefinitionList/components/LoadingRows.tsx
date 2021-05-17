import SmallSkeleton from "app/components/shared/Skeleton/SmallSkeleton"
import Definition from "./Definition"

type Props = {
  numRows: number
}

const LoadingRows: React.FC<Props> = ({ numRows }) => <>
  { [...Array(numRows)].map((_, index) => <Definition term={ <SmallSkeleton /> } value={ <SmallSkeleton /> } />) }
</>
export default LoadingRows
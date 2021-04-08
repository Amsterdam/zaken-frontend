import { FC } from "react"
import Details from "./Details"

type Props = {
  numRows: number
}
const LoadingDetails: FC<Props> = ({ numRows }) => (
  <Details isLoading={true} title="loading" values={{}} numLoadingRows={numRows} />
)

export default LoadingDetails

import React from "react"
import Details from "./Details"

type Props = {
  numRows: number
  title?: string
}
const LoadingDetails: React.FC<Props> = ({ numRows, title = "loading" }) => (
  <Details isLoading={true} title={title} values={{}} numLoadingRows={numRows} />
)

export default LoadingDetails

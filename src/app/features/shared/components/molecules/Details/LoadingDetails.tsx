import React from "react"
import DefinitionList from "../DefinitionList/DefinitionList"

type Props = {
  numRows: number
}
const LoadingDetails: React.FC<Props> = ({ numRows }) => (
  <DefinitionList isLoading={true} title="loading" values={{}} numLoadingRows={numRows} />
)

export default LoadingDetails

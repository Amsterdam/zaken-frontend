import DetailHeader from "./DetailHeader"
import { useCase } from "@/api/hooks"

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"]
  enableSwitch?: boolean
}

const DetailHeaderByCaseId: React.FC<Props> = ({ caseId, enableSwitch }) => {
  const { data } = useCase(caseId)
  const bagId = data?.address?.bag_id

  return bagId !== undefined ? (
    <DetailHeader bagId={bagId} enableSwitch={enableSwitch} />
  ) : null
}

export default DetailHeaderByCaseId

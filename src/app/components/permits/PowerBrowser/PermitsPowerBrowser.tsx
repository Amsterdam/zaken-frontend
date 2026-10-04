import { usePermitsPowerBrowser } from "@/api/hooks"
import { Description } from "@/components/Description/Description"
import { Table } from "@/components/Table/Table"
import { type ColumnType } from "@/components/Table/types"
import { PermitBadge } from "../components/PermitBadge"
import { PermitValidityLabel } from "../components/PermitValidityLabel"
import { PermitsSection } from "../components/PermitsSection"
import type { PowerBrowserPermit } from "../types"
import { shouldShowDummyData } from "../useDummyData"
import { createPermitDescriptionData } from "./data/createPermitDescriptionData"
import dummyPowerBrowserResponse from "./data/dummyPowerBrowserResponse"
import { isValidPermit, sortPermits } from "./data/utils"

type Props = {
  bagId: string
}

const columns: ColumnType<PowerBrowserPermit>[] = [
  {
    header: "Vergunning",
    dataIndex: "product",
    render: (_, permit) => (
      <PermitValidityLabel
        label={permit.product}
        isValid={isValidPermit(permit)}
      />
    ),
  },
  {
    header: "Status",
    dataIndex: "status",
    hideOnMobile: true,
    render: (_, permit) => <PermitBadge status={permit.status ?? ""} />,
  },
]

/**
 * The permits from PowerBrowser, valid ones first (the same as the permits
 * card of top-frontend-v2).
 */
const PermitsPowerBrowser: React.FC<Props> = ({ bagId }) => {
  const query = usePermitsPowerBrowser(bagId)
  const permits = Array.isArray(query.data) ? query.data : []
  const isDummyData = shouldShowDummyData(query, permits.length)
  const sortedPermits = [
    ...(isDummyData ? dummyPowerBrowserResponse : permits),
  ].sort(sortPermits)

  return (
    <PermitsSection
      title="Vergunningen PowerBrowser"
      count={sortedPermits.length}
      isPending={query.isPending}
      isError={query.isError}
      errorText="Vergunningen konden niet worden opgehaald."
      emptyText="Geen vergunningen gevonden."
      isDummyData={isDummyData}
    >
      <Table
        columns={columns}
        data={sortedPermits}
        loading={query.isPending}
        numLoadingRows={3}
        pagination={false}
        verticalAlign="middle"
        expandable={{
          expandedRow: (permit) => (
            <Description
              termsWidth="narrow"
              data={createPermitDescriptionData(permit)}
            />
          ),
          rowLabel: (permit) => permit.product,
        }}
      />
    </PermitsSection>
  )
}

export default PermitsPowerBrowser

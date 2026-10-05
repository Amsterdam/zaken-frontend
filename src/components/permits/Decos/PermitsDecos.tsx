import { usePermitDetails } from "@/api/hooks"
import { Description } from "@/components/Description/Description"
import { Table } from "@/components/Table/Table"
import { type ColumnType } from "@/components/Table/types"
import { renderStatusBadge } from "@/shared/renderStatusBadge"
import { PermitValidityLabel } from "../components/PermitValidityLabel"
import { PermitsSection } from "../components/PermitsSection"
import type { DecosPermit } from "../types"
import { shouldShowDummyData } from "../useDummyData"
import { createPermitDescriptionData } from "./data/createPermitDescriptionData"
import dummyDecosResponse from "./data/dummyDecosResponse"
import { filterKnownPermits, isDateValid } from "./data/utils"

type Props = {
  bagId: string
}

function renderPermitStatus(permit: DecosPermit) {
  if (permit.permit_granted === "GRANTED") {
    return isDateValid(permit)
      ? renderStatusBadge("Verleend", { variant: "success" })
      : renderStatusBadge("Verlopen", { variant: "error" })
  }
  if (permit.permit_granted === "NOT_GRANTED") {
    return renderStatusBadge("Niet verleend", { variant: "warning" })
  }
  return null
}

const columns: ColumnType<DecosPermit>[] = [
  {
    header: "Vergunning",
    dataIndex: "permit_type",
    render: (_, permit) => (
      <PermitValidityLabel
        label={permit.permit_type}
        isValid={permit.permit_granted === "GRANTED" && isDateValid(permit)}
      />
    ),
  },
  {
    header: "Status",
    dataIndex: "permit_granted",
    hideOnMobile: true,
    render: (_, permit) => renderPermitStatus(permit),
  },
]

/** The permits from Decos (the same as the Decos card of top-frontend-v2). */
const PermitsDecos: React.FC<Props> = ({ bagId }) => {
  const query = usePermitDetails(bagId)
  const permits = (query.data?.permits ?? []) as unknown as DecosPermit[]
  const isDummyData = shouldShowDummyData(query, permits.length)
  const knownPermits =
    filterKnownPermits(isDummyData ? dummyDecosResponse : permits) ?? []

  return (
    <PermitsSection
      title="Vergunningen Decos"
      count={knownPermits.length}
      isPending={query.isPending}
      isError={query.isError}
      errorText="Vergunningen konden niet worden opgehaald."
      emptyText="Geen Decos vergunningen gevonden."
      isDummyData={isDummyData}
    >
      <Table
        columns={columns}
        data={knownPermits}
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
          rowLabel: (permit) => permit.permit_type,
        }}
      />
    </PermitsSection>
  )
}

export default PermitsDecos

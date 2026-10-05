import {
  Alert,
  Column,
  Heading,
  Paragraph,
} from "@amsterdam/design-system-react"
import { useResidents } from "@/api/hooks"
import { Table } from "@/components/Table/Table"
import { type ColumnType } from "@/components/Table/types"
import { isAcceptanceOrLocalEnvironment } from "@/config/isAcceptanceOrLocalEnvironment"
import { PersonHeader } from "./components/PersonHeader/PersonHeader"
import { ResidentDetails } from "./components/ResidentDetails/ResidentDetails"
import { dummyResidentsResponse } from "./data/dummyResidentsResponse"
import type { Resident } from "./types"
import { formatName } from "./utils/formatting"
import { getVisibleResidentsSortedByAge } from "./utils/getVisibleResidentsSortedByAge"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
}

const columns: ColumnType<Resident>[] = [
  {
    header: "Naam",
    dataIndex: "name",
    render: (_, resident) => <PersonHeader resident={resident} />,
  },
  { header: "Leeftijd", dataIndex: "leeftijd", hideOnMobile: true },
]

/**
 * The people registered on an address (BRP), oldest first; a row opens the
 * personal and family details. The same component as the BRP card of
 * top-frontend-v2.
 */
const Residents: React.FC<Props> = ({ bagId }) => {
  const { data, isPending, isError } = useResidents(bagId)
  const persons = (data?.personen ?? []) as Resident[]
  // Outside production an address without residents shows made-up people, so
  // there is something to look at and test with. Not when the request failed.
  const showDummyData =
    isAcceptanceOrLocalEnvironment() &&
    !isPending &&
    !isError &&
    persons.length === 0
  const residents = getVisibleResidentsSortedByAge(
    showDummyData ? dummyResidentsResponse.personen : persons,
  )

  // Nothing to head: the tab already says what this is about.
  if (isError) {
    return (
      <Alert heading="Niet gelukt" headingLevel={2} severity="error">
        <Paragraph>
          Ingeschreven personen konden niet worden opgehaald.
        </Paragraph>
      </Alert>
    )
  }
  if (!isPending && residents.length === 0) {
    return <Paragraph>Geen ingeschreven personen gevonden.</Paragraph>
  }

  return (
    <Column gap="small">
      <Heading level={2}>
        Ingeschreven personen{isPending ? "" : ` (${residents.length})`}
      </Heading>
      {showDummyData && (
        <Paragraph size="small">
          Voorbeeldgegevens: op dit adres staat niemand ingeschreven. Dit zie je
          alleen op test en acceptatie.
        </Paragraph>
      )}
      <Table
        columns={columns}
        data={residents}
        loading={isPending}
        numLoadingRows={4}
        pagination={false}
        verticalAlign="middle"
        expandable={{
          expandedRow: (resident) => <ResidentDetails resident={resident} />,
          rowLabel: (resident) => formatName(resident.naam),
        }}
      />
    </Column>
  )
}

export default Residents

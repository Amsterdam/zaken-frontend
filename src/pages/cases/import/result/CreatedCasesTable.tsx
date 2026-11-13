import { Column, Heading, StandaloneLink } from "@amsterdam/design-system-react"
import type { ProcessedCaseResult } from "@/api/hooks"
import { RouterLink } from "@/components/DefaultLayout/RouterLink"
import { Table } from "@/components/Table/Table"

type Props = {
  /** The rows of the file for which a case was made. */
  created?: ProcessedCaseResult[]
  /** While the cases are being made: rows that are loading. */
  loading?: boolean
}

/**
 * The cases made by the import, in the order of the file: the row in Excel,
 * the address and the case, with a link to it as in the other case tables.
 */
export function CreatedCasesTable({ created, loading = false }: Props) {
  return (
    <Column gap="small">
      <Heading level={3}>Aangemaakte zaken</Heading>
      <Table<ProcessedCaseResult>
        data={created}
        loading={loading}
        pagination={false}
        columns={[
          { header: "Rij", dataIndex: "row_number", noWrap: true },
          { header: "Adres", dataIndex: "address" },
          { header: "Zaak", dataIndex: "case_id", noWrap: true },
          {
            noWrap: true,
            render: (_, { case_id, address }) => (
              <StandaloneLink
                linkComponent={RouterLink}
                href={`/zaken/${case_id}`}
                aria-label={`Zaakdetails van zaak ${case_id}, ${address}`}
              >
                Zaakdetails
              </StandaloneLink>
            ),
          },
        ]}
      />
    </Column>
  )
}

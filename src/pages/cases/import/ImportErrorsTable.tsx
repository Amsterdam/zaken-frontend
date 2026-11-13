import { Column, Heading, StandaloneLink } from "@amsterdam/design-system-react"
import type { ProcessedCaseResult } from "@/api/hooks"
import { Table } from "@/components/Table/Table"

type Props = {
  /** The addresses of the file for which no case can be made. */
  failed: ProcessedCaseResult[]
}

/**
 * The addresses with errors after checking the file (step 2) or importing it
 * (the result), in the order of the file:
 * the row in Excel, the address and what is wrong. An address found in the BAG
 * has a link to its overview in the last column, as in the other tables (e.g.
 * to see the open case that is already there). In a new tab: in step 2 you
 * would lose the file and the check.
 */
export function ImportErrorsTable({ failed }: Props) {
  return (
    <Column gap="small">
      <Heading level={3}>Fouten</Heading>
      <Table<ProcessedCaseResult>
        data={failed}
        pagination={false}
        columns={[
          { header: "Rij", dataIndex: "row_number", noWrap: true },
          { header: "Adres", dataIndex: "address" },
          { header: "Fout", dataIndex: "error" },
          {
            noWrap: true,
            render: (_, { address, bag_id }) =>
              bag_id && (
                <StandaloneLink
                  href={`/adres/${bag_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Unique: a row's link says which address it is.
                  aria-label={`Adres bekijken: ${address} (opent in een nieuw tabblad)`}
                >
                  Adres bekijken
                </StandaloneLink>
              ),
          },
        ]}
      />
    </Column>
  )
}

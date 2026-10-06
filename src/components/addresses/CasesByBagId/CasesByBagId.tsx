import { Column, Heading, Paragraph } from "@amsterdam/design-system-react"
import { useCasesByBagId } from "@/api/hooks"
import { Table } from "@/components/Table/Table"
import { columnsClosedCases, columnsOpenCases } from "./columns"

type Props = {
  bagId: components["schemas"]["Address"]["bag_id"]
  openCases?: boolean
  title?: string
  emptyText?: string
}

const defaultTitle = "Zaken"
const defaultEmptyText = "Op dit adres zijn er geen zaken"

/** The open or the closed cases on an address. */
const CasesByBagId: React.FC<Props> = ({
  bagId,
  openCases = false,
  title = defaultTitle,
  emptyText = defaultEmptyText,
}) => {
  const { data, isLoading: isBusy } = useCasesByBagId(bagId)
  const caseList =
    data?.results?.filter((result) =>
      openCases ? result.end_date === null : result.end_date !== null,
    ) || []
  const numCases = caseList.length

  return (
    <Column gap="small">
      <Heading level={2}>
        {title}
        {numCases > 0 && ` (${numCases})`}
      </Heading>
      {!isBusy && numCases === 0 ? (
        <Paragraph>{emptyText}</Paragraph>
      ) : (
        <Table
          columns={openCases ? columnsOpenCases : columnsClosedCases}
          loading={isBusy}
          numLoadingRows={1}
          data={caseList}
          pagination={false}
        />
      )}
    </Column>
  )
}
export default CasesByBagId

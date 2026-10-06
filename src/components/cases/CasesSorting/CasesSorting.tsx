import { SelectFilter } from "@/components/filters/SelectFilter"

type Sorting = Required<TABLE.Schemas.Sorting>

// The API cannot sort on the task (the current states) or the case id.
const options: { label: string; sorting: Sorting }[] = [
  {
    label: "Startdatum nieuw-oud",
    sorting: { dataIndex: "start_date", order: "DESCEND" },
  },
  {
    label: "Startdatum oud-nieuw",
    sorting: { dataIndex: "start_date", order: "ASCEND" },
  },
  {
    label: "Laatst gewijzigd nieuw-oud",
    sorting: { dataIndex: "last_updated", order: "DESCEND" },
  },
  {
    label: "Laatst gewijzigd oud-nieuw",
    sorting: { dataIndex: "last_updated", order: "ASCEND" },
  },
  {
    label: "Straat A-Z",
    sorting: { dataIndex: "address.street_name", order: "ASCEND" },
  },
  {
    label: "Straat Z-A",
    sorting: { dataIndex: "address.street_name", order: "DESCEND" },
  },
  {
    label: "Postcode oplopend",
    sorting: { dataIndex: "address.postal_code", order: "ASCEND" },
  },
  {
    label: "Postcode aflopend",
    sorting: { dataIndex: "address.postal_code", order: "DESCEND" },
  },
  {
    label: "Aanleiding A-Z",
    sorting: { dataIndex: "reason.name", order: "ASCEND" },
  },
  {
    label: "Aanleiding Z-A",
    sorting: { dataIndex: "reason.name", order: "DESCEND" },
  },
]

const toValue = ({ dataIndex, order }: TABLE.Schemas.Sorting) =>
  `${dataIndex}:${order}`

type Props = {
  sorting: TABLE.Schemas.Sorting
  onChange: (sorting: Sorting) => void
}

/** The order of the cases overview (the API sorts). */
const CasesSorting: React.FC<Props> = ({ sorting, onChange }) => (
  <SelectFilter
    label="Sorteren op"
    options={options.map(({ label, sorting }) => ({
      label,
      value: toValue(sorting),
    }))}
    value={toValue(sorting)}
    onChange={(value) => {
      const option = options.find(({ sorting }) => toValue(sorting) === value)
      if (option) onChange(option.sorting)
    }}
  />
)

export default CasesSorting

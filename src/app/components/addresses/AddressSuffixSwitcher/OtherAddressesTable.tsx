import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"
import useValues from "./hooks/useValues"
import Table from "app/components/shared/Table/Table"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  onAddressChosen: () => void
}

const columns = [
  { minWidth: 300, header: "Adres" },
  { minWidth: 100 }
]

const OtherAddressesTable: React.FC<Props> = ({ bagId, onAddressChosen }) => {

  const [response, { isBusy }] = useOtherAddressesByBagId(bagId)
  const values = useValues(response, onAddressChosen)

  return (
    <Table
      loading={ isBusy }
      numLoadingRows={ 3 }
      columns={ columns }
      hasFixedColumn
      data={ values }
      noValuesPlaceholder="Er zijn geen andere adressen gevonden"
    />
  )
}

export default OtherAddressesTable

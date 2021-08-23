import useValues from "./hooks/useValues"
import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"
import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"

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

  const values = useValues(response)

  const onClickRow = (data: Exclude<typeof values, undefined>[0]) => {
    onAddressChosen()
    navigateTo("/adres/:bagId", { bagId: data[2] })
  }

  return (
    <Table
      hasFixedColumn
      columns={ columns }
      loading={ isBusy }
      numLoadingRows={ 3 }
      data={ values }
      onClickRow={ onClickRow }
      noValuesPlaceholder="Er zijn geen andere adressen gevonden"
    />
  )
}

export default OtherAddressesTable

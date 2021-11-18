import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"
import { Table } from "@amsterdam/wonen-ui"
import navigateTo from "app/routing/navigateTo"
import columns from "./columns"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  onAddressChosen: () => void
}

const OtherAddressesTable: React.FC<Props> = ({ bagId, onAddressChosen }) => {
  const [data, { isBusy }] = useOtherAddressesByBagId(bagId)

  const onClickRow = (data: any) => {
    onAddressChosen()
    navigateTo("/adres/:bagId", { bagId: data.adresseerbaar_object_id })
  }

  return (
    <Table
      hasFixedColumn
      columns={ columns }
      loading={ isBusy }
      numLoadingRows={ 3 }
      data={ data || [] }
      onClickRow={ onClickRow }
      emptyPlaceholder="Er zijn geen andere adressen gevonden"
    />
  )
}

export default OtherAddressesTable

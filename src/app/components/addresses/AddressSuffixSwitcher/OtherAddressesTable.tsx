import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"
import { Table } from "@amsterdam/wonen-ui"
import useNavigation from "app/routing/useNavigation"
import columns from "./columns"

type Props = {
  bagId: Components.Schemas.Address["bag_id"]
  onAddressChosen: () => void
}

const OtherAddressesTable: React.FC<Props> = ({ bagId, onAddressChosen }) => {
  const [data, { isBusy }] = useOtherAddressesByBagId(bagId)
  const { navigateTo } = useNavigation()

  const onClickRow = (data: any) => {
    onAddressChosen()
    navigateTo("/adres/:bagId", { bagId: data.adresseerbaar_object_id })
  }

  return (
    <Table
      lastColumnFixed
      columns={ columns }
      loading={ isBusy }
      numLoadingRows={ 3 }
      data={ data || [] }
      onClickRow={ onClickRow }
      emptyPlaceholder="Er zijn geen andere adressen gevonden"
      pagination={ false }
    />
  )
}

export default OtherAddressesTable

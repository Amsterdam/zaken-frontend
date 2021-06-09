import type { SearchResult } from "app/components/search/SearchResults/SearchResults"
import navigateTo from "app/routing/navigateTo"
import to from "app/routing/utils/to"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"

export default (
  response: SearchResult[] | undefined,
  onAddressChosen: () => unknown
) => {

  const onClick = (newBagId: Components.Schemas.Address["bag_id"]) => (event: React.MouseEvent) => {
    onAddressChosen()
    navigateTo("/adres/:bagId", { bagId: newBagId })
  }

  return response?.map(({ adres, adresseerbaar_object_id }) => (
    {
      onClick: onClick(adresseerbaar_object_id),
      itemList: [
        adres,
        <TableAction to={ to("/adres/:bagId", { bagId: adresseerbaar_object_id }) }>Open</TableAction>
      ]
    }
  ))
}

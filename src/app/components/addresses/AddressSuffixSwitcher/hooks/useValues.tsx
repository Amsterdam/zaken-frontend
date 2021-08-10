import type { SearchResult } from "app/components/search/SearchResults/SearchResults"
import to from "app/routing/utils/to"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import navigateTo from "app/routing/navigateTo"

export default (response: SearchResult[] | undefined, onAddressChosen: () => void) => [
  response?.map(({ adres, adresseerbaar_object_id }) => (
    {
      itemList: [
        adres,
        <TableAction to={ to("/adres/:bagId", { bagId: adresseerbaar_object_id }) }>Open</TableAction>
      ]
    }
  )),
  (event: React.MouseEvent, index: number) => {
    onAddressChosen()
    const newBagId = response?.[index].adresseerbaar_object_id
    navigateTo("/adres/:bagId", { bagId: newBagId })
  }
] as const

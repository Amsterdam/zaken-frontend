import { SearchResult } from "../SearchResults"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import to from "app/routing/utils/to"
import navigateTo from "app/routing/navigateTo"

export default (results?: SearchResult[]) => [
  results?.filter(({ postcode }) => typeof postcode === "string")
    .map(({ adresseerbaar_object_id, adres, postcode }) => ({
      itemList: [
        adres ?? "-",
        postcode ?? "-",
        adresseerbaar_object_id ?
          <TableAction to={ to("/adres/:bagId", { bagId: adresseerbaar_object_id }) }>Bekijk</TableAction> :
          null
      ]
    })),
  (event: React.MouseEvent, index: number) => {
    const bagId = results?.[index].adresseerbaar_object_id
    navigateTo("/adres/:bagId", { bagId })
  }
] as const
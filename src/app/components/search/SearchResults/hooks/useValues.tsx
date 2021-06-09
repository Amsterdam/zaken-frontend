import { SearchResult } from "../SearchResults"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import to from "app/routing/utils/to"
import navigateTo from "app/routing/navigateTo"

const onClick = (bagId: Components.Schemas.Address["bag_id"]) => (event: React.MouseEvent) => {
  navigateTo("/adres/:bagId", { bagId })
}

export default (results?: SearchResult[]) =>
  results?.filter(({ postcode }) => typeof postcode === "string")
    .map(({ adresseerbaar_object_id, adres, postcode }) => ({
      onClick: onClick(adresseerbaar_object_id),
      itemList: [
        adres ?? "-",
        postcode ?? "-",
        adresseerbaar_object_id ?
          <TableAction to={ to("/adres/:bagId", { bagId: adresseerbaar_object_id }) }>Bekijk</TableAction> :
          null
      ]
    }))
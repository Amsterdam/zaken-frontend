import { SearchResult } from "../SearchResults"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import to from "app/routing/utils/to"

export default (results?: SearchResult[]) =>
  results?.filter(({ postcode }) => typeof postcode === "string")
    .map(({ adresseerbaar_object_id, adres, postcode }) => (
      [
        adres ?? "-",
        postcode ?? "-",
        <TableAction to={ to("/zaken/:id", { id: adresseerbaar_object_id }) }>Zaakdetails</TableAction>,
        adresseerbaar_object_id
      ]
    ))
import type { SearchResult } from "app/components/search/SearchResults/SearchResults"
import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"

export default (response?: SearchResult[]) =>
  response?.map(({ adres, adresseerbaar_object_id }) =>
    [
      adres,
      <TableAction to={ to("/adres/:bagId", { bagId: adresseerbaar_object_id })}>Open</TableAction>,
      adresseerbaar_object_id
    ]
  )

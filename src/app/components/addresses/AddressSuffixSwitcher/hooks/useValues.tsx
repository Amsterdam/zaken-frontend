import type { SearchResult } from "app/components/search/SearchResults/SearchResults"

export default (response?: SearchResult[]) =>
  response?.map(({ adres, adresseerbaar_object_id }) => (
    [
      adres,
      adresseerbaar_object_id
    ]
  ))

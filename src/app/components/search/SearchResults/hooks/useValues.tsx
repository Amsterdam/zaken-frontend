import { SearchResult } from "../SearchResults"

export default (results?: SearchResult[]) =>
  results?.filter(({ postcode }) => typeof postcode === "string")
    .map(({ adresseerbaar_object_id, adres, postcode }) => (
      [
        adres ?? "-",
        postcode ?? "-",
        adresseerbaar_object_id
      ]
    ))
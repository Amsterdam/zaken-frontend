import { SearchResult } from "../SearchResults"
import OpenButton from "app/components/shared/OpenButton/OpenButton"
import to from "app/routing/utils/to"

export default (results?: SearchResult[]) =>
  results?.filter(({ postcode }) => typeof postcode === "string")
    .map(({ adresseerbaar_object_id, adres, postcode }) => ({
      href: to("/adres/:bagId", { bagId: adresseerbaar_object_id }),
      itemList: [
        adres ?? "-",
        postcode ?? "-",
        adresseerbaar_object_id ?
          <OpenButton href={ to("/adres/:bagId", { bagId: adresseerbaar_object_id }) } text="Bekijk" /> :
          null
      ]
    }))
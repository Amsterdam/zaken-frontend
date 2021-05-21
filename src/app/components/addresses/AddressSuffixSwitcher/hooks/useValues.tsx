import { useCallback } from "react"
import { useLocation } from "@reach/router"
import navigateTo from "app/routing/navigateTo"
import { Button } from "@amsterdam/asc-ui"
import { ChevronRight } from "app/components/shared/Icons"
import type { SearchResult } from "app/components/search/SearchResults/SearchResults"

export default (
  bagId: Components.Schemas.Address["bag_id"],
  response: SearchResult[] | undefined,
  onAddressChosen: () => void
) => {

  const { pathname } = useLocation()

  const onClick = useCallback((otherBagId: Components.Schemas.Address["bag_id"]) => {
    onAddressChosen()
    return navigateTo(pathname.replace(bagId, otherBagId))
  }, [onAddressChosen, bagId, pathname])

  return response?.map(({ adres, adresseerbaar_object_id }) => ({
    itemList: [adres, <Button
        onClick={ () => onClick(adresseerbaar_object_id )}
        as="span"
        variant="textButton"
        iconSize={ 24 }
        iconLeft={ <ChevronRight /> }>
        Open
      </Button>
    ]
  }))
}

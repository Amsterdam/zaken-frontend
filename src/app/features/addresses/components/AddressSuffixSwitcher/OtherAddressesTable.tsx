import React, { useCallback, useMemo } from "react"
import { useLocation, navigate } from "@reach/router"
import { ChevronRight } from "app/features/shared/components/atoms/Icons"
import { Button } from "@amsterdam/asc-ui"

import useOtherAddressesByBagId from "app/state/rest/custom/useOtherAddresses/useOtherAddresses"
import { BAGAddressResponse } from "app/state/rest/types/BAGAddressResponse"
import Table from "app/features/shared/components/molecules/Table/Table"
import { useBAG } from "app/state/rest"

type Props = {
  onAddressChosen: () => void
  bagId: string
}

const columns = [
  { minWidth: 300, header: "Adres" },
  { minWidth: 100 }
]

type SearchResult = Pick<BAGAddressResponse["results"][0], "adres" | "landelijk_id">
const mapData = (onClick: (bagId: string) => void) => (data: SearchResult) => 
({
  itemList: [
    `${ data.adres }`,
    <Button
      onClick={() => onClick(data.landelijk_id)}
      as="span"
      variant="textButton"
      iconSize={24}
      iconLeft={<ChevronRight />}>
      Open
    </Button>
  ]
})

const OtherAddressesTable: React.FC<Props> = ({ bagId, onAddressChosen }) => {
  const { pathname } = useLocation()
  const { data: currentAddress } = useBAG(bagId)
  const { data, isBusy } = useOtherAddressesByBagId(bagId)
  const filteredAddresses = data?.results.filter(
    address => address.huisnummer.toString().length === currentAddress?.results[0].huisnummer?.toString().length)
  const onClick = useCallback((otherBagId: string) => {
    onAddressChosen()
    return navigate(pathname.replace(bagId, otherBagId))
  }, [ onAddressChosen, bagId, pathname ])

  const mappedData = useMemo(
    () => filteredAddresses?.map(mapData(onClick)),
    [filteredAddresses, onClick]
  )

  return (<Table
    columns={columns}
    data={mappedData}
    loading={isBusy}
    numLoadingRows={3}
    hasFixedColumn={true}
    noValuesPlaceholder={"Er zijn (nog) geen andere adressen gevonden"}
  />)
}

export default OtherAddressesTable

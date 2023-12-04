const getAddressFromBagResults = (data?: BAGAddressResponse): BAGAddressResponse["results"][number] | undefined => (
  data?.results?.find((result) => result.type_adres === "Hoofdadres")
)

export default getAddressFromBagResults

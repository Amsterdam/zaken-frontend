export const getAddressFromBagPdokResponse = (data?: BAGPdokResponse):  BAGPdokAddress | undefined => {
  const docs = data?.response?.docs
  return (
    docs?.find((result) => result.adrestype === "hoofdadres")
  ) 
}

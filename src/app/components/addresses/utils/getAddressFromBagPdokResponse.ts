export const getAddressFromBagPdokResponse = (data?: BAGPdokResponse):  BAGPdokAddress | undefined => {
  const docs = data?.response?.docs
  return docs && docs[0] ? docs[0] : undefined
}

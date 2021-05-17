export default (data?: { permits: Components.Schemas.DecosPermit[] }) => {
  const permits = data?.permits.filter(({ permit_granted }) => permit_granted !== "UNKNOWN")
  if (permits === undefined || permits.length === 0) return undefined
  return permits
}
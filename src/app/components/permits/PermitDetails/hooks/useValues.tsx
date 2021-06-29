import { DateDisplay } from "@amsterdam/wonen-ui"

export default (permit: Components.Schemas.Permit) => {

  const { permit_granted, permit_type, details } = permit

  const isGranted = permit_granted === "GRANTED"
  const permitIsForBAndB = permit_type.startsWith("B&B")
  const endDateBAndB = details?.DATE_VALID_UNTIL ?? details?.DATE_VALID_TO
  const endDate = details?.DATE_VALID_TO ?? details?.DATE_VALID_UNTIL

  const optionalValues = [
    ["Resultaat", details?.RESULT],
    ["Omschrijving zaak", details?.SUBJECT],
    ["Soort vergunning", details?.PERMIT_TYPE],
    ["Aangevraagd door", details?.APPLICANT],
    permitIsForBAndB ? ["Vergunninghouder", details?.HOLDER] : undefined,
    ["Locatie", details?.ADDRESS],
    isGranted ? ["Verleend per", <DateDisplay date={ details?.DATE_VALID_FROM } emptyText="-" />] : undefined,
    isGranted && permitIsForBAndB && endDateBAndB ?
      ["Geldig tot en met", <DateDisplay date={ endDateBAndB } />] :
      ["Geldig tot", <DateDisplay date={ endDate } emptyText="-" />],
    permit_granted === "NOT_GRANTED" ? ["Datum besluit", <DateDisplay date={ details?.DATE_DECISION } emptyText="-" />] : undefined
  ]

  const values = optionalValues.filter((value): value is [string, React.ReactNode] => value !== undefined)

  return Object.fromEntries(values)
}
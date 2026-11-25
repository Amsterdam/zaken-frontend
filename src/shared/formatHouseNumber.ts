type HouseNumber = {
  number?: number | null
  suffix_letter?: string | null
  suffix?: string | null
}

/** The house number in PDOK notation: number, letter, then "-" and addition ("26A-1"). */
export function formatHouseNumber({
  number,
  suffix_letter,
  suffix,
}: HouseNumber) {
  const houseNumber = `${number ?? ""}${suffix_letter ?? ""}`
  return suffix ? `${houseNumber}-${suffix}` : houseNumber
}

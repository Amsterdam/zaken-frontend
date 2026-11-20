// The reasons (aanleidingen) that ask for more than the reason alone.
export const REASON_PROJECT = "Project"
export const REASON_MMA = "MMA"
export const REASON_SIG = "SIG melding"
// Only for a case made for a listing in TON.
export const REASON_DIGITAL_SURVEILLANCE = "Digitaal toezicht"

/**
 * The reasons that cannot be chosen when importing cases: they ask for
 * something of one case (an MMA number, the report of a citizen, a listing in
 * TON). Keep it the same as REASONS_NOT_FOR_IMPORT in the backend
 * (CaseFileUploadSerializer).
 */
export const REASONS_NOT_FOR_IMPORT: readonly string[] = [
  REASON_MMA,
  REASON_SIG,
  REASON_DIGITAL_SURVEILLANCE,
]
